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
import { Progress } from "@/components/ui/progress";
import TaskScheduler from "@/components/TaskScheduler";

function RecordDetail() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aIGeneratedCode, setAIGeneratedCode] = useState(null);
  const [geminiResponseData, setGeminiResponseData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
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
    if (record && record.file) {
      getAIGeneratedCode();
    }
  }, [record]);

  const getAIGeneratedCode = async () => {
    if (!record || !record.file) {
      setError("No file available for processing.");
      return;
    }
    setLoading(true);
    setError(null);
    setGeminiResponseData(null);

    setLoadingMessage("Please wait while our AI works its magic...");

    try {
      const fileContent = record.file.content;

      if (!fileContent) {
        setError("File content is missing.");
        return;
      }
      const geminiResponse = await fetch("/api/generateScript", {
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
          scriptId: geminiResponseData.id,  // This is the script ID.
          recordId: id,
        }),
      });
  
      if (!execResponse.ok) {
        setError(`Execution error! Status: ${execResponse.status}`);
      }

      const execResult = await execResponse.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div>
        <div className=" flex py-8 ">
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" bg-gray-100 p-lg-2">
      {/* Back to Dashboard Button */}
      <div className=" flex py-2 ">
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
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
        <div >
          <Card >
            <div className="flex justify-between items-center ">
              <CardTitle>
                <h1 className="text-3xl mx-6 font-semibold text-gray-800">
                  {record.title}
                </h1>
              </CardTitle>
              <div className="my-4 flex space-x-2">
                <Link href={`${id}/results/`}>
                  <Button variant="outline" className="flex items-center mr-4">
                    Get Results
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="h-[68vh]" >
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="h-[330]">
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
                    <Button
                      onClick={handleRunAIGeneratedCode}
                      disabled={running}
                      className={`${running ? "opacity-50" : ""}`}
                    >
                      {running ? "Running... " : "Run Task"}
                    </Button>
                    {/* Show Progress Bar if Running */}
                    {running && (
                      <div
                        style={{}}
                        className="grid grid-cols-12 mt-6  rounded p-0"
                      >
                        <Progress
                          value={progress}
                          max={100}
                          className="w-full col-span-11 my-auto"
                        />
                        <p
                          style={{ fontSize: "10px" }}
                          className="text-black font-semibold "
                        >
                          {`${progress}%`}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700">No file available</p>
                )}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Card for Generated Description */}
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 mb-2">
                <DescriptionDisplayer id={ id } />
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Display generated Puppeteer code */}
      {/* {aIGeneratedCode && (
        <div>
          <h2 className="text-xl font-semibold">Generated Puppeteer Code</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {aIGeneratedCode}
          </pre>
        </div>
      )} */}

      {/* Button to show output results */}
      <div className="my-4">
        <Link href={`${id}/results/`}>
          <Button variant="outline" className="flex items-center">
            Show Output Results
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RecordDetail;
