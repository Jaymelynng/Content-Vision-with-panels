
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { extractedContentId } = await req.json();

    if (!extractedContentId) {
      return new Response(
        JSON.stringify({ error: 'Extracted content ID is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Importing extracted content:', extractedContentId);

    // Get extracted content
    const { data: extractedContent, error: fetchError } = await supabase
      .from('extracted_content_ideas')
      .select('*')
      .eq('id', extractedContentId)
      .single();

    if (fetchError || !extractedContent) {
      return new Response(
        JSON.stringify({ error: 'Extracted content not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Import to content_ideas table
    const { data: newContentIdea, error: importError } = await supabase
      .from('content_ideas')
      .insert({
        title: extractedContent.title,
        description: extractedContent.description,
        category: extractedContent.category,
        difficulty: extractedContent.difficulty,
        engagement: extractedContent.engagement,
        target_audience: extractedContent.target_audience,
        formats: extractedContent.formats,
        features: extractedContent.features,
        requirements: extractedContent.requirements,
        setup_planning_photo: extractedContent.setup_planning_photo,
        setup_planning_video: extractedContent.setup_planning_video,
        production_tips_photo: extractedContent.production_tips_photo,
        production_tips_video: extractedContent.production_tips_video,
        upload_track_photo: extractedContent.upload_track_photo,
        upload_track_video: extractedContent.upload_track_video,
        thumbnail: null // Will be set later if needed
      })
      .select()
      .single();

    if (importError) {
      console.error('Error importing content idea:', importError);
      return new Response(
        JSON.stringify({ error: 'Failed to import content idea' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Update extracted content to mark as imported
    await supabase
      .from('extracted_content_ideas')
      .update({ 
        imported_to_content_ideas: true,
        content_idea_id: newContentIdea.id
      })
      .eq('id', extractedContentId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        content_idea_id: newContentIdea.id 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error importing content idea:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
