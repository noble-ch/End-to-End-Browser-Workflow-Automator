import React, { useState, useEffect } from "react";

function TotalTask() {
  const [totalTasks, setTotalTasks] = useState(0); 
  const [completedTasks, setCompletedTasks] = useState(0);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/totalTaskHandler");
        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }
        const tasks = await response.json();
        
        setTotalTasks(tasks.total || 0); 
        setCompletedTasks(tasks.completed || 0);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4  border rounded-xl">
        <h3 className="text-lg font-bold">Summary</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col  justify-center  p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600">Total Tasks: {totalTasks}</p>
            <p className="text-sm text-gray-600">Completed Tasks: {completedTasks}</p>

            <p className="text-2xl font-bold"></p>
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
