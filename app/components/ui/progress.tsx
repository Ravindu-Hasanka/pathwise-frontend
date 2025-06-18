import * as React from "react";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };
