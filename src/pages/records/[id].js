import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DescriptionDisplayer from "@/components/DescriptionDisplayer";
import { Atom } from "react-loading-indicators";

function RecordDetail() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aIGeneratedCode, setAIGeneratedCode] = useState(null);
  const [geminiResponseData, setGeminiResponseData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(""); // New state for loading message
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getRecordById?id=${id}`);
        const data = await res.json();

        if (res.ok) {
          setRecord(data.data);
        } else {
          setError(data.error || "Failed to fetch record details");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    }

    fetchRecord();
  }, [id]);

  useEffect(() => {
    // Automatically run the AI code generation after the record is fetched
    if (record && record.file) {
      getAIGeneratedCode();
    }
  }, [record]); // This effect will run whenever `record` is updated

  const getAIGeneratedCode = async () => {
    if (!record || !record.file) {
      setError("No file available for processing.");
      return;
    }
    setLoading(true);
    setError(null);
    setGeminiResponseData(null);

    // Set initial loading message
    setLoadingMessage("Please wait while our AI works its magic...");

    try {
      const fileContent = record.file.content;

      if (!fileContent) {
        setError("File content is missing.");
        return;
      }
      const geminiResponse = await fetch("/api/geminicode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: fileContent,
          recordId: id,
        }),
      });

      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error! Status: ${geminiResponse.status}`);
      }

      const geminiData = await geminiResponse.json();
      const puppeteerScript =
        geminiData?.script || "No Puppeteer script found.";

      setGeminiResponseData(geminiData);
      setAIGeneratedCode(puppeteerScript);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAIGeneratedCode = async () => {
    if (!aIGeneratedCode) {
      setError("No Puppeteer code to run.");
      return;
    }

    setLoading(true);

    try {
      const execResponse = await fetch("/api/executePuppeteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: aIGeneratedCode,
          scriptId: geminiResponseData.id,
          recordId: id,
        }),
      });

      if (!execResponse.ok) {
        throw new Error(`Execution error! Status: ${execResponse.status}`);
      }

      const execResult = await execResponse.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Array of loading messages
  const loadingMessages = [
    "Please wait while our AI works its magic...",
    "Almost done... just a few more seconds!",
    "Hang tight, we're processing the data for you.",
    "AI is doing its thing, check back shortly!",
    "Almost there... your results are on the way!",
  ];

  useEffect(() => {
    let messageInterval;
    if (loading) {
      let currentIndex = 0;
      messageInterval = setInterval(() => {
        setLoadingMessage(loadingMessages[currentIndex]);
        currentIndex = (currentIndex + 1) % loadingMessages.length;
      }, 3000); // Change message every 3 seconds
    }

    return () => clearInterval(messageInterval); // Clean up the interval on unmount
  }, [loading]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back to Dashboard Button */}
      <div className="my-4">
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card>
        <div className="flex justify-between items-center">
          <CardTitle>
            <h1 className="text-3xl mx-6 font-semibold text-gray-800">
              {record.title}
            </h1>
          </CardTitle>
          <div className="my-4 flex space-x-2">
            <Button onClick={handleRunAIGeneratedCode} disabled={loading}>
              Run Puppeteer
            </Button>
            <Link href={`${id}/results/`}>
              <Button variant="outline" className="flex items-center">
                Show Output Results
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Centered Loading Spinner, Background Blur, and Changing Text */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
          <Atom
            color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]}
            size="small"
          />
          <p className="text-white mt-4 text-xl font-semibold">
            {loadingMessage}
          </p>
        </div>
      )}

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${
          loading ? "blur-sm" : ""
        }`}
      >
        {/* Left Column - Card for Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {record.description}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Created At:</strong>{" "}
                {new Date(record.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Updated At:</strong>{" "}
                {new Date(record.updatedAt).toLocaleString()}
              </p>
              <h2 className="text-xl font-semibold mt-6 mb-4">File</h2>
              {record.file ? (
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>Filename:</strong> {record.file.filename}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Content Type:</strong> {record.file.contentType}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Path:</strong>{" "}
                    <Link
                      href={`/api/download?filename=${encodeURIComponent(
                        record.file.filename
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Download File
                    </Link>
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">No file available</p>
              )}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Right Column - Card for Generated Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Generated Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 mb-2">
                <DescriptionDisplayer id={id} />
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RecordDetail;
