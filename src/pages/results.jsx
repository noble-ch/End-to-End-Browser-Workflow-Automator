import { useEffect, useState } from "react";

export default function Dashboard({ userId }) {
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        const response = await fetch(`/api/getOutputs?userId=${userId}`);
        const data = await response.json();
        setOutputs(data.outputs);
      } catch (error) {
        console.error("Error fetching outputs:", error);
      }
    };

    fetchOutputs();
  }, [userId]);

  return (
    <div>
      <h1>Test Outputs</h1>
      {outputs.length > 0 ? (
        outputs.map((output) => (
          <div key={output._id} style={{ marginBottom: "20px" }}>
            <h2>Execution Output</h2>
            <p>Script: {output.script}</p>
            <p>Standard Output: {output.stdout || "N/A"}</p>
            <p>Error Output: {output.stderr || "N/A"}</p>
            <h3>Screenshots</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {output.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  style={{
                    width: "200px",
                    height: "auto",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No outputs found.</p>
      )}
    </div>
  );
}
