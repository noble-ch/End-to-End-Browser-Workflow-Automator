import puppeteer from 'puppeteer';
import vm from 'vm';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ error: 'Script is required' });
    }

    try {
      // Launch a new Puppeteer browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Inject Puppeteer and page into the sandbox context
      const sandbox = { puppeteer, page, browser };

      // Create the context to run the script
      const context = vm.createContext(sandbox);

      // Log the script for debugging
      console.log("Executing Script:", script);

      // Execute the sanitized script within the sandboxed environment
      await vm.runInContext(script, context);

      // Close the browser after execution
      await browser.close();

      res.status(200).json({ message: 'Puppeteer script executed successfully' });
    } catch (error) {
      console.error("Execution Error:", error);
      res.status(500).json({ error: 'Error executing Puppeteer script' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
