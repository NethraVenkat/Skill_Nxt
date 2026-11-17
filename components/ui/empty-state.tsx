import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-card border-dashed p-6 text-center", className)}>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description ? <p className="mt-2 text-sm text-text-secondary">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
