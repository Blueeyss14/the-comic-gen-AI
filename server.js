import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const BANNED_KEYWORDS = ['porn', 'nude', 'naked', 'nsfw', 'sex', 'explicit', 'telanjang', 'hentai', 'xxx', 'intercourse', 'erotic', 'fetish'];

app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) return res.status(500).json({ message: 'API key not configured' });

  const prompt = req.body?.input?.messages?.[0]?.content?.[0]?.text?.toLowerCase() || '';
  if (BANNED_KEYWORDS.some(word => prompt.includes(word))) {
    return res.status(400).json({ message: 'Prompt contains inappropriate content.' });
  }

  try {
    const response = await fetch('https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));