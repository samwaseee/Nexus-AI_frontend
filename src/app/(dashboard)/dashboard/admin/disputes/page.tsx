import { AlertTriangle, Hammer } from "lucide-react";

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution</h1>
        <p className="text-muted-foreground">
          Review and resolve conflicts between clients and freelancers.
        </p>
      </div>

      <div className="rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-muted/10">
        <div className="rounded-full bg-amber-500/10 p-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-medium">No active disputes</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-4">
          The platform is currently running smoothly. New disputes requiring intervention will appear here.
        </p>
      </div>
    </div>
  );
}