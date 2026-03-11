import type { VercelRequest, VercelResponse } from '@vercel/node';

const BANNED_KEYWORDS = [
  'porn', 'nude', 'naked', 'nsfw', 'sex', 'explicit',
  'telanjang', 'hentai', 'xxx','intercourse', 'erotic', 'fetish'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'API key not configured on server' });
  }

  const prompt = req.body?.input?.messages?.[0]?.content?.[0]?.text?.toLowerCase() || '';
  const isBanned = BANNED_KEYWORDS.some(word => prompt.includes(word));

  if (isBanned) {
    return res.status(400).json({ message: 'Prompt contains inappropriate content.' });
  }

  try {
    const response = await fetch(
      'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}