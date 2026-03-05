import { useState, useCallback } from 'react';

interface GenerationOptions {
  genre: string;
  mode: string;
  artStyle: string;
  panels: string;
  ratio: string;
  prompt: string;
}

interface UseQwenGenerationReturn {
  isGenerating: boolean;
  error: string | null;
  generateComic: (options: GenerationOptions) => Promise<string | null>;
  resetError: () => void;
}

export function useQwenGeneration(): UseQwenGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateComic = useCallback(async (options: GenerationOptions): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const fullPrompt = buildComicPrompt(options);
      const apiKey = import.meta.env.VITE_QWEN_API_KEY;

      if (!apiKey) {
        throw new Error('Qwen API key not configured');
      }
      const requestBody = {
        model: 'qwen-image-max',
        input: {
          messages: [
            {
              role: 'user',
              content: [
                { text: fullPrompt }
              ]
            }
          ]
        },
        parameters: {
          size: getRatioSize(options.ratio),
          prompt_extend: true,
          watermark: false,
          negative_prompt: 'low resolution, low quality, deformed limbs, deformed fingers, oversaturated, blurry text, distorted text',
        }
      };

      const response = await fetch('/api/v1/services/aigc/multimodal-generation/generation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API error ${response.status}: ${data.code || 'Unknown'}`);
      }

      const imageUrl = data?.output?.choices?.[0]?.message?.content?.find(
        (item: { image?: string }) => item.image
      )?.image ?? null;

      if (!imageUrl) {
        throw new Error('No image in response. Check console for full response.');
      }

      return imageUrl;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { isGenerating, error, generateComic, resetError };
}

function buildComicPrompt(options: GenerationOptions): string {
  const { genre, mode, artStyle, panels, prompt } = options;
  const panelCount = panels.match(/\d+/)?.[0] || '4';
  const colorMode = mode === 'Color' ? 'full vibrant colors' : 'black and white monochrome';

  return `A ${genre.toLowerCase()} comic strip in ${artStyle} art style. ${panelCount} panels arranged in a grid layout. ${colorMode}. Story: ${prompt}. High quality illustration, consistent character design throughout all panels, clear visual storytelling, professional comic book artwork, speech bubbles with dialogue, ${genre}-appropriate atmosphere.`;
}

function getRatioSize(ratio: string): string {
  switch (ratio) {
    case '16:9': return '1664*928';
    case '9:16': return '928*1664';
    case '1:1':
    default:     return '1328*1328';
  }
}