"use client";

import * as React from "react";
import clsx from "clsx";

export interface DialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <div
      aria-hidden={!open}
      className={clsx(
        "fixed inset-0 z-50 grid place-items-center px-4 transition",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className={clsx("fixed inset-0 bg-black/50", open ? "opacity-100" : "opacity-0")}></div>
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative z-10 w-full max-w-lg rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-5 border-b border-neutral-200 dark:border-neutral-800", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx("font-semibold", className)} {...props} />;
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-5", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-5 pt-0 flex justify-end gap-2", className)} {...props} />;
}



