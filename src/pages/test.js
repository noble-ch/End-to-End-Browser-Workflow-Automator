import { useState } from "react";

/**
 * TestGeminiAPI component
 * Demonstrates how to make a POST request to the Gemini API using the Fetch API,
 * display the generated Puppeteer code, and then execute the code with a "Run" button.
 */

export default function TestGeminiAPI() {
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
    1. Launch a new browser instance using Puppeteer.
    2. Create a new page within the browser.
    3. Set a default timeout of 5000 milliseconds for page actions.
    4. Set the viewport size to 1356x931 pixels.
    5. Navigate to the new tab page (chrome://new-tab-page/).
    6. Click on the search input field using a race condition to find the element among several locators. The click is targeted at a specific offset within the element.
    7. Fill the search input field with the text "next js ".
    8. Click on the search input field again using a race condition and a specific offset.
    9. Fill the search input field with the text "next js code".
    10. Press the Enter key using the keyboard emulation.
    11. Release the Enter key using the keyboard emulation.
    12. Close the browser instance.
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

      const puppeteerScript = responseData?.script || "No Puppeteer script found.";

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
      setExecutionResult(execResult);
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
            {JSON.stringify(executionResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
