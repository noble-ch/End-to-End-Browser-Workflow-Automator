//pages/api/puppeteer.js
// pages/api/puppeteer.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const pageTitle = await page.title();
    await browser.close();

    res.status(200).json({ pageTitle });
  } catch (error) {
    res.status(500).json({ error: 'Failed to run Puppeteer' });
  }
}
