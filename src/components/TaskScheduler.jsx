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

function TaskScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(null); 
  const [recurrence, setRecurrence] = useState(""); 
  const [isEditing, setIsEditing] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

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
          {/* Scheduling Section */}
          <div className="mb-15">
            <Label htmlFor="scheduledTime" className="mb-3 fontWeight-bold color-gray-700 fontSize-14 block">
              Time:
            </Label>
            <DatePicker
              onChange={(date) => {
                if (date && date < new Date()) {
                  alert("You cannot select a past date or time.");
                } else {
                  setScheduledTime(date);
                }
              }}
              showTimeSelect
              dateFormat="Pp"
              disabled={isScheduled}
              className="mb-3 w-full  fontSize-14 border-2 border-gray-300 rounded borderRadius-5"
            />
          </div>

          <div className="mb-15">
            <Label htmlFor="recurrence" className="mb-3 fontWeight-bold color-gray-700 fontSize-14 block">
              Repeat:
            </Label>
            <select
              id="recurrence"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
             
              className="w-full fontSize-14 border-2 border-gray-300 rounded borderRadius-5 p-2"
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
          className="flex justify-center gap-10 mt-5">
            {isScheduled ? (
              <Button onClick={handleStop} style={styles.stopButton}>
                Stop Task
              </Button>
            ) : (
              <Button
                onClick={handleSchedule}
                className="p-2-2 bg-blue-500 text-white rounded-md fontWeight-bold borderRadius-5 border-none cursor-pointer"
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

