import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ExecutionLogs from "@/components/ExecutionResults/ExecutionLogs";
import ExecutionScreenshots from "@/components/ExecutionResults/ExecutionScreenshots";
import ImageModal from "@/components/ExecutionResults/ImageModal";
// import Button from "../ui/";
import { getNextImage } from "@/components/ExecutionResults/helpers";

const ExecutionResults = () => {
  const [executionResults, setExecutionResults] = useState([]);
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchExecutionResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/getExecutionResults?id=${id}`);
        const data = await res.json();
        console.log("sss", data);

        if (res.ok) {
          const optimizedResults = data.map((result) => ({
            ...result,
            logs: JSON.parse(result.logs).map((log) => ({
              ...log,
              content: JSON.parse("aa", log.content),
            })),
          }));
          setExecutionResults(optimizedResults);
        } else {
          setError(data.error || "Failed to fetch execution results");
        }
      } catch (err) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <a href={`/records/${id}`} text="Back to Record" />
      <h1 className="text-3xl font-semibold mb-6">
        Execution Results for Task {id}
      </h1>

      {executionResults.length > 0 ? (
        executionResults.map((result) => (
          <div key={result.runId} className="mb-8">
            <div
              className="mb-4 cursor-pointer flex items-center"
              onClick={() =>
                setSelectedRunId(
                  selectedRunId === result.runId ? "ss" : result.runId
                )
              }
            >
              {/* Add the header for each result */}
            </div>
            {selectedRunId === result.runId && (
              <div className="ml-6">
                <ExecutionLogs
                  logs={result.logs}
                  runId={result.runId}
                  expanded={expandedSections[result.runId]?.logs}
                  toggleSection={toggleSection}
                />
                <ExecutionScreenshots
                  screenshots={result.screenshots}
                  runId={result.runId}
                  expanded={expandedSections[result.runId]?.screenshots}
                  toggleSection={toggleSection}
                  onImageClick={setSelectedImage}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No execution results found for this record.</p>
      )}

      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={(direction) =>
            setSelectedImage((prev) =>
              getNextImage(prev, direction, executionResults)
            )
          }
        />
      )}
    </div>
  );
};

export default ExecutionResults;
