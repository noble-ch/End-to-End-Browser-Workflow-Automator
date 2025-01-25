import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { disable } from "agenda/dist/job/disable";

function TaskScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(null); 
  const [recurrence, setRecurrence] = useState(""); 
  const [isEditing, setIsEditing] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
        if (scriptId) {
            try {
                const response = await fetch(`/api/taskScheduleHandler?scriptId=${scriptId}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (response.ok) {
                    const data = await response.json();
                    setScheduledTime(new Date(data.scheduledTime));
                    if (data.status === "scheduled") {
                      setIsScheduled(true);
                    } else {
                      setIsScheduled(false);
                    }
                    setRecurrence(data.recurrence || "once");
                } else {
                    console.error("Failed to fetch job details:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        }
    };
    fetchJobDetails();
}, [scriptId]);

  const handleSchedule = async () => {
    if (!scheduledTime || !scriptId || !recurrence) {
      alert("Please provide a scheduled time, script ID, and recurrence.");
      return;
    }

    setIsScheduling(true);
    try {
      const response = await fetch("/api/taskScheduleHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduledTime,
          aIGeneratedCode,
          recordId,
          scriptId,
          recurrence,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsScheduled(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while scheduling the task.");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleStop = async () => {
    if (!scriptId) {
      alert("No task to stop.");
      return;
    }

    try {
      const response = await fetch("/api/stopPuppeteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scriptId }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsScheduled(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while stopping the task.");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Schedule your Task</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-15">
            <Label htmlFor="scheduledTime" className="mb-2 fontWeight-bold color-gray-700 fontSize-14 block">
            Set Initial Time:
            </Label>
            <DatePicker
              selected={scheduledTime}
              onChange={(date) => {
                const currentDate = new Date();
                if (date < currentDate) {
                  setError("Scheduled time must be in the future");
                  return;
                } else {
                  setScheduledTime(date);
                }
                }}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                minTime={new Date().setHours(new Date().getHours(), new Date().getMinutes())}
                maxTime={new Date().setHours(23, 59)}
                disabled={isScheduled}
                className={`border border-gray-300 px-2 rounded-md ${isScheduled ? 'text-gray-500 cursor-not-allowed' : ''}`}
              />
              </div>

              <div className="mb-15">
              <Label htmlFor="recurrence" className="mt-3 mb-1 fontWeight-bold color-gray-700 fontSize-14 block">
                Repeat:
              </Label>
              <select
                id="recurrence"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className={`w-full fontSize-14 rounded borderRadius-5 p-2 ${isScheduled ? 'text-gray-700 cursor-not-allowed' : ''}`}
                disabled={isScheduled}
              >
                <option value="" disabled>
                Select Recurrence
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </div>
              {/* Buttons */}
          <div  
          className="flex  justify-center gap-10 mt-5">
            {isScheduled ? (
              <Button className='bg-red-500' onClick={handleStop}>
                Stop Task
              </Button>
            ) : (
              <Button
                onClick={handleSchedule}
                className="p-2-2  text-white rounded-md fontWeight-bold borderRadius-5 border-none cursor-pointer"
                disabled={isScheduling}
              >
                {isScheduling ? "Scheduling..." : "Schedule Task"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TaskScheduler;

