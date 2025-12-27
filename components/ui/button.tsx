"use client";

import * as React from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "default" | "secondary" | "destructive" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-[var(--ndc-red-primary)] text-white border-2 border-[var(--ndc-red-primary)] hover:bg-[var(--ndc-red-dark)] hover:border-[var(--ndc-red-dark)] font-semibold",
  secondary: "bg-[var(--ndc-black)] text-white border-2 border-[var(--ndc-black)] hover:bg-[var(--ndc-gray-dark)] hover:border-[var(--ndc-gray-dark)] font-semibold",
  destructive: "bg-[var(--ndc-red-dark)] text-white border-2 border-[var(--ndc-red-dark)] hover:bg-red-900 font-semibold",
  ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 border-2 border-transparent",
  outline: "border-2 border-[var(--ndc-red-primary)] bg-transparent text-[var(--ndc-red-primary)] hover:bg-[var(--ndc-red-primary)] hover:text-white font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-8 text-base",
  icon: "h-11 w-11 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          "inline-flex items-center justify-center rounded-sm font-bold uppercase tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ndc-red-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;



