const { useState } = require("react");

/**
 * TestGeminiAPI component
 * Demonstrates how to make a POST request to the Gemini API using the Fetch API,
 * display the generated Puppeteer code, and then execute the code with a "Run" button.
 */

function TestGeminiAPI() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [executionResult, setExecutionResult] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null); // Store the generated Puppeteer code

  const handleTestAPI = async () => {
    setLoading(true);
    setError(null);
    setExecutionResult(null);

    const description = `
const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 953,
            height: 931
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('chrome://new-tab-page/');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://noble-ch.vercel.app/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.col-lg-8'),
            targetPage.locator('::-p-xpath(//*[@id=\\"about\\"]/div/div[2]/div[2])'),
            targetPage.locator(':scope >>> div.col-lg-8')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 207.25,
                y: 398.375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('main.service-page div:nth-of-type(1) > p'),
            targetPage.locator('::-p-xpath(//*[@id=\\"services\\"]/div/div[2]/div[1]/p)'),
            targetPage.locator(':scope >>> main.service-page div:nth-of-type(1) > p'),
            targetPage.locator('::-p-text(Custom web application)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 154.75,
                y: 19.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Your Name)'),
            targetPage.locator('div:nth-of-type(2) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[2]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(2) > input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46.875,
                y: 36.953125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Your Name)'),
            targetPage.locator('div:nth-of-type(2) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[2]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(2) > input')
        ])
            .setTimeout(timeout)
            .fill('hello');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Your Email)'),
            targetPage.locator('div:nth-of-type(3) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[3]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(3) > input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 43.625,
                y: 42.953125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Your Email)'),
            targetPage.locator('div:nth-of-type(3) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[3]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(3) > input')
        ])
            .setTimeout(timeout)
            .fill('noblebiru@yahoo.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Subject)'),
            targetPage.locator('div:nth-of-type(4) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[4]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(4) > input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 177.875,
                y: 14.953125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enter Subject)'),
            targetPage.locator('div:nth-of-type(4) > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[4]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(4) > input')
        ])
            .setTimeout(timeout)
            .fill('Test');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Your Message)'),
            targetPage.locator('div.mb-2 > textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[5]/textarea)'),
            targetPage.locator(':scope >>> div.mb-2 > textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 117.875,
                y: 37.953125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Your Message)'),
            targetPage.locator('div.mb-2 > textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[5]/textarea)'),
            targetPage.locator(':scope >>> div.mb-2 > textarea')
        ])
            .setTimeout(timeout)
            .fill('hello');
    }
    {
        const target = await browser.waitForTarget(t => t.url() === 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Lcvh1IoAAAAAPKT2jxy74Z4liO7JySsYRPYxwY5&co=aHR0cHM6Ly9ub2JsZS1jaC52ZXJjZWwuYXBwOjQ0Mw..&hl=en&type=image&v=zIriijn3uj5Vpknvt_LnfNbF&theme=dark&size=normal&badge=bottomright&cb=qvm05w1cysgq', { timeout });
        const targetPage = await target.page();
        targetPage.setDefaultTimeout(timeout);
        await puppeteer.Locator.race([
            targetPage.locator('div.recaptcha-checkbox-border'),
            targetPage.locator('::-p-xpath(//*[@id=\\"recaptcha-anchor\\"]/div[1])'),
            targetPage.locator(':scope >>> div.recaptcha-checkbox-border')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 15,
                y: 17.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Send Message)'),
            targetPage.locator('#contact button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"contact\\"]/div/div[2]/div[2]/form/div/div[5]/button)'),
            targetPage.locator(':scope >>> #contact button'),
            targetPage.locator('::-p-text(Send Message)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 66.875,
                y: 33.734375,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});

`;

    try {
      const response = await fetch("/api/geminicode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      const puppeteerScript =
        responseData?.script || "No Puppeteer script found.";

      // Set the generated Puppeteer code for display
      setGeneratedCode(puppeteerScript);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunPuppeteer = async () => {
    if (!generatedCode) {
      setError("No Puppeteer code to execute.");
      return;
    }

    setLoading(true);
    setError(null);
    setExecutionResult(null);

    try {
      const execResponse = await fetch("/api/executePuppeteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: generatedCode }),
      });

      if (!execResponse.ok) {
        throw new Error(`Execution error! status: ${execResponse.status}`);
      }

      const execResult = await execResponse.json();
      setExecutionResult(execResult.output); // Display the script output
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Test Gemini API</h1>
      <button onClick={handleTestAPI} disabled={loading}>
        {loading ? "Loading..." : "Generate Puppeteer Code"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {generatedCode && (
        <div>
          <h2>Generated Puppeteer Code:</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap", // Ensure wrapping of long lines
              wordWrap: "break-word", // Allow wrapping
            }}
          >
            {generatedCode}
          </pre>
          <button onClick={handleRunPuppeteer} disabled={loading}>
            {loading ? "Running..." : "Run Puppeteer Code"}
          </button>
        </div>
      )}

      {executionResult && (
        <div>
          <h2>Execution Result:</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {executionResult}
          </pre>
        </div>
      )}
    </div>
  );
}

module.exports = TestGeminiAPI;
