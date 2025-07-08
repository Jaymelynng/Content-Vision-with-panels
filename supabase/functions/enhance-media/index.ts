import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    })

    const formData = await req.formData()
    const file = formData.get('file') as File
    const quality = formData.get('quality') as string
    const type = formData.get('type') as string

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Convert file to base64 data URL
    const arrayBuffer = await file.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    const dataUrl = `data:${file.type};base64,${base64}`

    console.log(`Enhancing ${type} to ${quality} quality`)

    let output;
    
    if (type === 'image') {
      // Use Real-ESRGAN for image upscaling
      const scaleMap = {
        '2k': 2,
        '4k': 4,
        '8k': 8,
        'ultra': 8
      }
      
      output = await replicate.run(
        "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
        {
          input: {
            image: dataUrl,
            scale: scaleMap[quality as keyof typeof scaleMap] || 4,
            face_enhance: false
          }
        }
      )
    } else {
      // Use video enhancement model
      output = await replicate.run(
        "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        {
          input: {
            img: dataUrl,
            version: "v1.4",
            scale: 2
          }
        }
      )
    }

    console.log("Enhancement completed:", output)

    return new Response(
      JSON.stringify({ 
        enhancedUrl: Array.isArray(output) ? output[0] : output,
        originalSize: file.size,
        quality: quality
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error("Error in enhance-media function:", error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})