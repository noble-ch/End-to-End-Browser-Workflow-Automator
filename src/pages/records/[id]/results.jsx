import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";

export default function RecordResults() {
  const [executionResults, setExecutionResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchExecutionResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/getExecutionResults?id=${id}`);
        const rawData = await res.text(); // Get raw response data
        console.log("Raw response data:", rawData);

        let data = [];
        try {
          data = JSON.parse(rawData); // Parse raw data into JSON
        } catch (jsonError) {
          console.error("Error parsing API response as JSON:", jsonError);
          setError("Invalid API response format");
          setLoading(false);
          return;
        }

        if (res.ok) {
          const optimizedResults = data.map((result) => {
            let parsedLogs = [];
            try {
              parsedLogs = JSON.parse(result.logs).map((log) => {
                let parsedContent = {};
                try {
                  // Check if log.content is a valid JSON string
                  if (typeof log.content === "string") {
                    try {
                      parsedContent = JSON.parse(log.content);
                    } catch (parseError) {
                      //if its not valid json, assign the string directly.
                      parsedContent = log.content;
                    }
                  } else {
                    parsedContent = log.content;
                  }
                } catch (contentError) {
                  console.error(
                    "Error parsing log content:",
                    contentError,
                    log.content
                  );
                  parsedContent = { error: "Invalid log content" }; // Fallback
                }
                return { ...log, content: parsedContent };
              });
            } catch (logsError) {
              console.error("Error parsing logs:", logsError, result.logs);
              parsedLogs = [{ error: "Invalid logs structure" }]; // Fallback
            }

            return { ...result, logs: parsedLogs };
          });

          console.log("Optimized results:", optimizedResults);
          setExecutionResults(optimizedResults);
        } else {
          setError(data.error || "Failed to fetch execution results");
        }
      } catch (err) {
        console.error("Error fetching execution results:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchExecutionResults();
  }, [id]);

  const toggleSection = (runId, section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [runId]: {
        ...prev[runId],
        [section]: !prev[runId]?.[section],
      },
    }));
  };

  const handleImageClick = (imageUrl) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        {" "}
        <div className="my-4">
          <Link href={`/records/${id}`}>
            <Button variant="outline">Back to Record</Button>
          </Link>
        </div>
        <p style={{ color: "red" }}>{error}</p>;
      </div>
    );

  return (
    <div className="min-h-screen  p-8">
      {/* Back Button */}
      <div className="my-4">
        <Link href={`/records/${id}`}>
          <Button variant="outline">Back to Record</Button>
        </Link>
      </div>

      <h1 className="text-3xl font-semibold mb-6">
        Execution Results for Task {id}
      </h1>
      {executionResults.length > 0 ? (
        executionResults.map((result) => (
          <div key={result.runId} className="mb-8">
            <p
              className="mb-4 cursor-pointer flex items-center"
              onClick={() =>
                setSelectedRunId(
                  selectedRunId === result.runId ? null : result.runId
                )
              }
            >
              <Folder className="mr-2" />
              {selectedRunId === result.runId ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              Output ID: {result.runId}
              <span
                className={`ml-20 ${
                  result.status === "completed"
                    ? "text-green-500"
                    : result.status === "failed"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {result.status}
              </span>
              <span className="ml-20">
                {new Date(result.createdAt).toLocaleString()}
              </span>
            </p>
            {selectedRunId === result.runId && (
              <div className="ml-6">
                {/* Logs Folder */}
                <div className="mb-4">
                  <p
                    className="cursor-pointer flex items-center"
                    onClick={() => toggleSection(result.runId, "logs")}
                  >
                    <Folder className="mr-2" />
                    {expandedSections[result.runId]?.logs ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                    Logs
                  </p>
                  {expandedSections[result.runId]?.logs && (
                    <div className="ml-6">
                      {result.logs.length > 0 ? (
                        result.logs.map((log, index) => (
                          <div key={index} className="mb-4">
                            <h4 className="font-medium">
                              Log {index + 1} Details
                            </h4>
                            <table className="table-auto w-full border">
                              <thead>
                                <tr>
                                  <th className="px-2 py-1 border">
                                    Timestamp
                                  </th>
                                  <th className="px-2 py-1 border">
                                    Step Name
                                  </th>
                                  <th className="px-2 py-1 border">
                                    Performance Metrics
                                  </th>
                                  <th className="px-2 py-1 border">Result</th>
                                  <th className="px-2 py-1 border">Error</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(log.content) ? (
                                  log.content.map((nestedLog, nestedIndex) => (
                                    <tr key={nestedIndex}>
                                      <td className="px-2 py-1 border">
                                        {new Date(
                                          nestedLog.timestamp
                                        ).toLocaleString()}
                                      </td>
                                      <td className="px-2 py-1 border">
                                        {nestedLog.stepName || "N/A"}
                                      </td>
                                      <td className="px-2 py-1 border">
                                        {nestedLog.performanceMetrics
                                          ? Object.entries(
                                              nestedLog.performanceMetrics
                                            )
                                              .map(
                                                ([key, value]) =>
                                                  `${key}: ${value}`
                                              )
                                              .join(", ")
                                          : "N/A"}
                                      </td>
                                      <td className="px-2 py-1 border">
                                        {nestedLog.result || " -  "}
                                      </td>
                                      <td className="px-2 py-1 border break-words whitespace-normal">
                                        {nestedLog.error || " - "}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="5"
                                      className="px-2 py-1 border"
                                    >
                                      {typeof log.content === "string"
                                        ? log.content
                                        : "Invalid log content format"}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        ))
                      ) : (
                        <p>No logs available.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Screenshots Folder */}
                <div>
                  <p
                    className="cursor-pointer flex items-center"
                    onClick={() => toggleSection(result.runId, "screenshots")}
                  >
                    <Folder className="mr-2" />
                    {expandedSections[result.runId]?.screenshots ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                    Screenshots
                  </p>
                  {expandedSections[result.runId]?.screenshots && (
                    <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {result.screenshots.length > 0 ? (
                        result.screenshots.map((screenshot, index) => (
                          <div
                            key={index}
                            className="cursor-pointer border p-2 rounded"
                            onClick={() => handleImageClick(screenshot.url)}
                          >
                            <img
                              src={screenshot.url}
                              alt={`Step ${index + 1}`}
                              className="w-full h-32 object-cover border rounded"
                            />
                            <p className="text-sm mt-2 text-center">
                              {screenshot.url.split("/").pop()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No screenshots available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No execution results found for this record.</p>
      )}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-xl max-h-xl"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-primary shadow rounded px-2 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
