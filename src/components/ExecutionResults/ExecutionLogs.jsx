const ExecutionLogs = ({ logs, runId, expanded, toggleSection }) => (
  <div className="mb-4">
    <p
      className="cursor-pointer flex items-center"
      onClick={() => toggleSection(runId, "logs")}
    >
      Logs
    </p>
    {expanded && (
      <div className="ml-6">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="mb-4">
              {/* Render log details */}
            </div>
          ))
        ) : (
          <p>No logs available.</p>
        )}
      </div>
    )}
  </div>
);

export default ExecutionLogs;
