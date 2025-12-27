import * as React from "react";
import { cx } from "@/lib/cx";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cx(
        "text-sm font-medium text-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
}


