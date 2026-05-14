import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIPitchPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pitch Builder</h1>
          <p className="text-muted-foreground">Generate the perfect proposal for your next client.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Draft a Proposal</CardTitle>
          <CardDescription>Enter the job details below and let AI write your cover letter.</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center border-t bg-muted/10 text-muted-foreground">
          AI Generation Form coming soon!
        </CardContent>
      </Card>
    </div>
  );
}