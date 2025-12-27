import * as React from "react";
import { cx } from "@/lib/cx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cx(
                    "flex h-11 w-full rounded-sm border-2 border-[var(--ndc-gray-light)] bg-white px-4 py-2 text-base font-medium",
                    "placeholder:text-[var(--ndc-gray-medium)] placeholder:font-normal",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--ndc-red-primary)] focus:ring-offset-1 focus:border-[var(--ndc-red-primary)]",
                    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
                    "dark:border-[var(--ndc-gray-medium)] dark:bg-[var(--ndc-gray-dark)] dark:text-white dark:placeholder:text-[var(--ndc-gray-light)]",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
