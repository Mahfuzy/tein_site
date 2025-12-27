import * as React from "react";
import { cx } from "@/lib/cx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-sm border-2 border-[var(--ndc-gray-light)] dark:border-[var(--ndc-gray-medium)] bg-white dark:bg-[var(--ndc-gray-dark)] text-[var(--ndc-black)] dark:text-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("p-6 border-b-2 border-[var(--ndc-gray-light)] dark:border-[var(--ndc-gray-medium)]", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("font-bold text-xl tracking-tight uppercase", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("text-sm text-[var(--ndc-gray-medium)] dark:text-[var(--ndc-gray-light)]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("p-6 pt-0", className)} {...props} />;
}



