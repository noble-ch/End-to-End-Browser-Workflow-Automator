import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const TaskChart = () => {
  const [data, setData] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/graphTaskHandler"); 
        const tasks = await response.json();

        console.log(tasks); 

        const aggregatedData = tasks.reduce((acc, task) => {
          const { status } = task; 
          acc[status] = acc[status] ? acc[status] + 1 : 1; 
          return acc;
        }, {});

        
        const chartData = Object.entries(aggregatedData).map(([status, count]) => ({
          status,
          count,
        }));

        setData(chartData); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="status" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#3182CE" />
    </BarChart>
  );
};

export default TaskChart;
