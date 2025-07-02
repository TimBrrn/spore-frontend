import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loader({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Loader2
        aria-label="Chargement"
        className={cn("animate-spin text-muted-foreground", className)}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
