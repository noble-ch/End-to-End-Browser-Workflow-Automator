import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Folder } from "lucide-react"; // Importing the Folder icon from Lucide React

export default function RecordResults() {
  const [executionResults, setExecutionResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchExecutionResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/getExecutionResults?id=${id}`);
        const data = await res.json();

        console.log("Execution results fetched from backend:", data);

        if (res.ok) {
          setExecutionResults(data);
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back to Record Details Button */}
      <div className="my-4">
        <Link href={`/records/${id}`}>
          <Button variant="outline" className="flex items-center">
            Back to Record
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-semibold mb-6">
        Execution Results for Record {id}
      </h1>

      {executionResults.length > 0 ? (
        executionResults.map((result) => (
          <div key={result.runId} className="mb-8">
            <h2
              className="text-xl font-bold mb-4 cursor-pointer flex items-center"
              onClick={() => setSelectedRunId(selectedRunId === result.runId ? null : result.runId)}
            >
              <Folder className="mr-2" /> {/* Folder icon */}
              {selectedRunId === result.runId ? "▲" : "▶"} Run ID: {result.runId}
            </h2>
            {selectedRunId === result.runId && (
              <div>
                {result.screenshots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {result.screenshots.map((screenshot, index) => {
                      const imageName = screenshot.url.split("/").pop(); // Extracting the image name
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-4 cursor-pointer border p-2 rounded"
                          onClick={() => handleImageClick(screenshot.url)}
                        >
                          <img
                            src={screenshot.url}
                            alt={`Step ${index + 1}`}
                            className="w-16 h-16 border rounded shadow-md object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold text-gray-700">
                              {imageName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Timestamp:{" "}
                              {new Date(screenshot.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No screenshots available for this run.</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No execution results found for this record.</p>
      )}

      {/* Modal for viewing image */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-3xl max-h-3xl"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
