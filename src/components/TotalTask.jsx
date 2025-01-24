import React, { useState, useEffect } from "react";

function TotalTask() {
  const [totalTasks, setTotalTasks] = useState(0); // Assuming totalTasks is a number
  const [completedTasks, setCompletedTasks] = useState(0); // Optional: Store completed task count separately
  const [error, setError] = useState(null); // Optional: Handle errors if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/totalTaskHandler");
        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }
        const tasks = await response.json();
        
        // Assuming the API returns an object like { total: number, completed: number }
        setTotalTasks(tasks.total || 0); // Fallback to 0 if `tasks.total` is undefined
        setCompletedTasks(tasks.completed || 0); // Fallback to 0 if `tasks.completed` is undefined
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message); // Optional: Store the error message
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4 bg-muted/50 border rounded-xl">
        <h3 className="text-lg font-bold">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600">Completed Tasks</p>
            <p className="text-2xl font-bold">{completedTasks}</p>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">Error: {error}</p>
        )}
      </div>
    </div>
  );
}

export default TotalTask;
