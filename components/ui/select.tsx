import * as React from "react";
import { cx } from "@/lib/cx";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { }

export function Select({ className, children, ...props }: SelectProps) {
    return (
        <select
            className={cx(
                "flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}
