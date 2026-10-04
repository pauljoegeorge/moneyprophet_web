import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-soft)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:-translate-y-px active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] hover:shadow-sm",
        secondary:
          "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--primary)]",
        outline:
          "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--primary)]",
        ghost:
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] hover:translate-y-0",
        destructive:
          "bg-transparent text-[var(--destructive)] border border-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-white",
        link: "text-[var(--primary)] underline-offset-4 hover:underline p-0 h-auto hover:translate-y-0",
      },
      size: {
        default: "h-[38px] px-4 text-sm rounded-[6px] max-w-[240px]",
        sm: "h-8 px-3 text-xs rounded-[6px]",
        lg: "h-11 px-6 text-sm rounded-[6px] max-w-[280px]",
        icon: "h-[38px] w-[38px] rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
