import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const queue = [
  { learner: "Aisha R.", issue: "Missing proof for customer interview", triage: "Needs guidance", risk: "low" },
  { learner: "Vikram K.", issue: "Potential duplicate mission submission", triage: "Review flagged", risk: "medium" },
  { learner: "Naina P.", issue: "Unsafe business claim in pitch deck", triage: "Escalate to mentor", risk: "high" },
];

export default function ModerationAdminPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-text">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-text">Moderation queue</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Flagged submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">18</p>
              <p className="mt-2 text-sm text-text-secondary">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg. resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">4.1h</p>
              <p className="mt-2 text-sm text-text-secondary">Across mentor review flow</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">12%</p>
              <p className="mt-2 text-sm text-text-secondary">Low risk after filtering</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {queue.map((item) => (
              <div key={item.learner} className="flex flex-col gap-3 rounded-control border border-border bg-surface/80 p-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-text">{item.learner}</p>
                  <p className="text-sm text-text-secondary">{item.issue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={item.risk === "high" ? "danger" : item.risk === "medium" ? "warning" : "success"}>{item.risk}</Badge>
                  <Badge tone="default">{item.triage}</Badge>
                  <Button variant="secondary" size="sm">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
