"use client";

import React, { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = forwardRef((props, ref) => {
  const { className, value, ...restProps } = props;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 border  overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...restProps}
    >
      <ProgressPrimitive.Indicator
        className="h-full  flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
