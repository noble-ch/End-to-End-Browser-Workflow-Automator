import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const [height, setHeight] = React.useState("auto"); // Dynamic height state

  const handleInput = (e) => {
    const textarea = e.target;
    setHeight('auto'); // Reset height first to shrink the textarea when deleting text
    setHeight(`${textarea.scrollHeight}px`); // Set height based on scrollHeight
  };

  return (
    <textarea
      className={cn(
        "mb-2 flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      style={{ height }} // Apply dynamic height here
      onInput={handleInput} // Adjust height when user types
      {...props} // Spread the rest of the props (e.g., value, onChange)
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
