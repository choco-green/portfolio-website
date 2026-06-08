import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../classNames";

export default function Tag({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("inline-flex rounded-md border border-line bg-raised px-2.5 py-1 text-xs font-black text-muted", className)}
      {...props}
    />
  );
}
