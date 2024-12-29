import { useState } from "react";
import { useHistory } from "react-router-dom";

function TaskPage() {
  const [generatedCode, setGeneratedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  // Function to generate Puppeteer code
  const handleGenerateCode = async () => {
    setLoading(true);
    setError(null);

    // Here you would generate Puppeteer code, for now we simulate it
    setTimeout(() => {
      setGeneratedCode("Generated Puppeteer Script");
      setLoading(false);
    }, 2000); // Simulate delay for generating code
  };

  // Function to run Puppeteer code
  const handleRunPuppeteer = async () => {
    if (!generatedCode) {
      setError("No Puppeteer code to execute.");
      return;
    }

    setLoading(true);
    setError(null);
    setExecutionResult(null);

    try {
      // API call to execute the Puppeteer code (with userId)
      const execResponse = await fetch("/api/executePuppeteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: generatedCode,
          userId: "someUserId", // Replace with the actual user ID
        }),
      });

      if (!execResponse.ok) {
        throw new Error(`Execution error! status: ${execResponse.status}`);
      }

      const data = await execResponse.json();
      setExecutionResult(data.output); // Display the results (screenshot URLs)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Task Page</h1>
      <button onClick={handleGenerateCode} disabled={loading}>
        {loading ? "Generating..." : "Generate Puppeteer Code"}
      </button>

      {generatedCode && (
        <div>
          <h2>Generated Puppeteer Code:</h2>
          <pre>{generatedCode}</pre>
          <button onClick={handleRunPuppeteer} disabled={loading}>
            {loading ? "Running..." : "Run Puppeteer Code"}
          </button>
        </div>
      )}

      {executionResult && (
        <div>
          <h2>Execution Result:</h2>
          <pre>{executionResult}</pre>
          {/* You can display the screenshots or other outputs here */}
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TaskPage;
