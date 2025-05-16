import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from '../../utils/sitemap';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sitemap = await generateSitemap();
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
} 