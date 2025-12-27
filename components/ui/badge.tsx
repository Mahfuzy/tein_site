import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badge = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
        outline: "border border-neutral-200 dark:border-neutral-800",
        secondary: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
        destructive: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" | "secondary" | "destructive" }) {
  return <span className={twMerge(badge({ variant }), className)} {...props} />;
}


