import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

// Preserve the existing primary alias and support secondary actions.
export const PrimaryButton = React.forwardRef(
  ({ className, variant, size, disabled, children, ...props }, ref) => {
    const shadcnSize = { lg: "lg", sm: "sm" }[size] || "default";
    return (
      <Button
        ref={ref}
        variant={variant === "primary" || !variant ? "default" : variant}
        size={shadcnSize}
        disabled={disabled}
        className={cn("font-semibold tracking-tight", className)}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="secondary" className={className} {...props} />
  ),
);
SecondaryButton.displayName = "SecondaryButton";

export const GhostButton = React.forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} variant="ghost" className={className} {...props} />
));
GhostButton.displayName = "GhostButton";

export const DestructiveButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="destructive" className={className} {...props} />
  ),
);
DestructiveButton.displayName = "DestructiveButton";
