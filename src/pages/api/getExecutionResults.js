import ExecutionOutput from "@/models/Output";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract recordId from query
  const { id } = req.query;
  const recordId = id;
  console.log("recordId", recordId);

  if (!recordId) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: recordId" });
  }
  console.log("recordId", recordId);
  try {
    console.log("Fetching execution results for recordId:", recordId);

    // Fetch all execution results for the provided recordId
    const executionResults = await ExecutionOutput.find({ recordId });

    if (!executionResults || executionResults.length === 0) {
      return res
        .status(404)
        .json({ error: "No execution results found for the given recordId" });
    }

    const resultData = executionResults.map((executionResult) => ({
      runId: executionResult.runId,
      screenshots: executionResult.screenshots
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort by timestamp
        .map((screenshot) => ({
          url: `${screenshot.path}`,
          timestamp: screenshot.timestamp,
        })),
    }));

    // Log the result data just before sending it to the client
    console.log("Execution results fetched successfully:", resultData);

    res.status(200).json(resultData);
  } catch (err) {
    console.error("Error fetching execution results:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
