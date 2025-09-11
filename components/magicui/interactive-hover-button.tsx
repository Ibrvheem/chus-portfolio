import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  innerClass?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, icon, innerClass, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full  bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-1 w-1 rounded-full bg-transparent group-hover:bg-green-500 transition-all duration-300 group-hover:scale-[100.8]",
            innerClass
          )}
        ></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0">
          {children}
        </span>
        <div className="h-1 w-1 "></div>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-8 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-100">
        <span>{children}</span>
        {icon}
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
