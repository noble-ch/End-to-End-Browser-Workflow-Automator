import ExecutionOutput from "@/models/Output";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: recordId" });
  }

  try {
    console.log("Fetching execution results for recordId:", id);

    const executionResults = await ExecutionOutput.find({ recordId: id });

    if (!executionResults || executionResults.length === 0) {
      return res
        .status(404)
        .json({ error: "No execution results found for the given recordId" });
    }

    const resultData = executionResults
      .map((executionResult) => {
        return {
          runId: executionResult.runId,
          outputPath: executionResult.outputPath,
          screenshots:
            executionResult.screenshots
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((screenshot) => ({
                url: `${screenshot.path}`,
                timestamp: screenshot.timestamp,
              })) || "no/path",
          status: executionResult.status,
          timestamps: executionResult.timestamps,
          createdAt: executionResult.createdAt,
          logs: executionResult.logs,
          outputPath: executionResult.outputPath || "no/path",

        };
      })
      .filter(Boolean);

    res.status(200).json(resultData);
  } catch (err) {
    console.error("Error fetching execution results:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
