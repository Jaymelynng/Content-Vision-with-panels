
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtractedContentIdea {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  engagement: 'low' | 'medium' | 'high';
  target_audience: string[];
  formats: string[];
  features: string[];
  requirements: any;
  setup_planning_photo: string[];
  setup_planning_video: string[];
  production_tips_photo: string[];
  production_tips_video: string[];
  upload_track_photo: string[];
  upload_track_video: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      'https://kplikoobcmzimpstjxcc.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { documentId } = await req.json();

    if (!documentId) {
      return new Response(
        JSON.stringify({ error: 'Document ID is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing document:', documentId);

    // Get document details
    const { data: document, error: docError } = await supabase
      .from('uploaded_documents')
      .select('*')
      .eq('id', documentId)
      .single();

    if (docError || !document) {
      return new Response(
        JSON.stringify({ error: 'Document not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Update status to processing
    await supabase
      .from('uploaded_documents')
      .update({ processing_status: 'processing' })
      .eq('id', documentId);

    // Download document from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.file_path);

    if (downloadError || !fileData) {
      await supabase
        .from('uploaded_documents')
        .update({ processing_status: 'failed' })
        .eq('id', documentId);

      return new Response(
        JSON.stringify({ error: 'Failed to download document' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Convert file to text based on type
    let textContent = '';
    try {
      if (document.file_type === 'application/pdf') {
        // For PDF files, we'll need to use a PDF parsing library
        // For now, let's handle text-based files
        textContent = 'PDF processing not yet implemented. Please upload text-based files.';
      } else if (document.file_type.includes('text') || document.filename.endsWith('.md') || document.filename.endsWith('.txt')) {
        textContent = await fileData.text();
      } else {
        textContent = await fileData.text(); // Try as text for other formats
      }
    } catch (error) {
      console.error('Error reading file content:', error);
      textContent = 'Could not parse file content. Please ensure the file is in a supported format.';
    }

    console.log('Document text length:', textContent.length);

    // Process with OpenAI
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      await supabase
        .from('uploaded_documents')
        .update({ processing_status: 'failed' })
        .eq('id', documentId);

      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Chunk the document if it's too large
    const maxChunkSize = 12000; // Conservative limit for OpenAI
    const chunks = [];
    
    if (textContent.length > maxChunkSize) {
      for (let i = 0; i < textContent.length; i += maxChunkSize) {
        chunks.push(textContent.slice(i, i + maxChunkSize));
      }
    } else {
      chunks.push(textContent);
    }

    console.log('Processing', chunks.length, 'chunks');

    const allExtractedIdeas: ExtractedContentIdea[] = [];

    // Process each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);

      const prompt = `
You are an expert content strategist for gymnastics gyms. Analyze the following text and extract structured content ideas for social media posts.

For each content idea you identify, provide a JSON object with these exact fields:
- title: Clear, engaging title
- description: Detailed description of the content idea
- category: One of: "skill-development", "seasonal-events", "event-promotion", "community-engagement", "educational-coaching", "behind-the-scenes"
- difficulty: "easy", "medium", or "hard"
- engagement: "low", "medium", or "high"
- target_audience: Array of strings like ["growth", "premium", "competitive", "recreational"]
- formats: Array of strings like ["photo", "video", "reel", "story"]
- features: Array of special features like ["Interactive Riddle", "Before/After", "Tutorial"]
- requirements: Object with structured requirements
- setup_planning_photo: Array of photo setup instructions
- setup_planning_video: Array of video setup instructions
- production_tips_photo: Array of photo production tips
- production_tips_video: Array of video production tips
- upload_track_photo: Array of photo upload guidelines
- upload_track_video: Array of video upload guidelines

Return ONLY a JSON array of content idea objects. Do not include any other text.

Text to analyze:
${chunk}
`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a gymnastics content expert. Extract content ideas and return only valid JSON arrays.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 3000,
          }),
        });

        if (!response.ok) {
          console.error('OpenAI API error:', response.status, await response.text());
          continue;
        }

        const aiResponse = await response.json();
        const content = aiResponse.choices[0]?.message?.content?.trim();

        if (content) {
          try {
            const ideas = JSON.parse(content);
            if (Array.isArray(ideas)) {
              allExtractedIdeas.push(...ideas);
            }
          } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
            console.log('Raw response:', content);
          }
        }
      } catch (aiError) {
        console.error('Error calling OpenAI:', aiError);
      }
    }

    console.log('Extracted', allExtractedIdeas.length, 'content ideas');

    // Save extracted ideas to database
    const insertPromises = allExtractedIdeas.map(idea => 
      supabase
        .from('extracted_content_ideas')
        .insert({
          document_id: documentId,
          gym_id: document.gym_id,
          ...idea
        })
    );

    await Promise.all(insertPromises);

    // Update document status
    await supabase
      .from('uploaded_documents')
      .update({ 
        processing_status: 'completed',
        processed_at: new Date().toISOString()
      })
      .eq('id', documentId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        extracted_ideas: allExtractedIdeas.length,
        chunks_processed: chunks.length
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
