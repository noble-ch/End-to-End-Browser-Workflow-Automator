const ExecutionScreenshots = ({ screenshots, runId, expanded, toggleSection, onImageClick }) => (
  <div>
    <p
      className="cursor-pointer flex items-center"
      onClick={() => toggleSection(runId, "screenshots")}
    >
      Screenshots
    </p>
    {expanded && (
      <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.length > 0 ? (
          screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="cursor-pointer border p-2 rounded"
              onClick={() => onImageClick(screenshot.url)}
            >
              <img src={screenshot.url} alt={`Step ${index + 1}`} className="w-full h-32 object-cover" />
            </div>
          ))
        ) : (
          <p>No screenshots available.</p>
        )}
      </div>
    )}
  </div>
);

export default ExecutionScreenshots;
