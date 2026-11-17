import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const learningSignals = [
  { label: "Lesson completion", value: 81, tone: "success" as const },
  { label: "Mission proof quality", value: 72, tone: "warning" as const },
  { label: "Retention from repeated review", value: 79, tone: "success" as const },
  { label: "Cohort engagement", value: 88, tone: "success" as const },
];

export default function LearningAdminPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-text">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-text">Learning overview</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Active learners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">2,418</p>
              <p className="mt-2 text-sm text-text-secondary">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completion rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">64%</p>
              <p className="mt-2 text-sm text-text-secondary">Across the first 3 modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg. mission score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">82/100</p>
              <p className="mt-2 text-sm text-text-secondary">Strongest in pricing and validation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demo Day fit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-text">76%</p>
              <p className="mt-2 text-sm text-text-secondary">High readiness for cohort feedback rounds</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Learning signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningSignals.map(({ label, value, tone }) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm text-text-secondary">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <ProgressBar value={value} />
                <div className="mt-2 flex justify-end">
                  <Badge tone={tone}>{tone === "warning" ? "Watch" : "Healthy"}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
