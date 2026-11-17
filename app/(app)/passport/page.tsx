import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const passportSections = [
  { title: "👤 About you", status: "complete" },
  { title: "🧩 The problem", status: "complete" },
  { title: "🙋 Your customer", status: "draft" },
  { title: "✅ Test results", status: "draft" },
  { title: "💰 Price & money", status: "empty" },
  { title: "🔍 What you guessed vs what was true", status: "draft" },
] as const;

export default function PassportPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Your work, in one place</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Venture Passport 📒</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Everything you learn and do fills this up — step by step it becomes a simple plan for your idea that you can show others.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How full is your passport?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">It fills up automatically as you finish lessons and real-life missions.</p>
            <ProgressBar value={66} />
            <p className="text-sm text-text-secondary">Keep going — each lesson adds a page.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pages in your passport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {passportSections.map((section) => (
              <div key={section.title} className="rounded-card border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-text">{section.title}</p>
                  <Badge
                    tone={
                      section.status === "complete"
                        ? "success"
                        : section.status === "draft"
                          ? "warning"
                          : "default"
                    }
                  >
                    {section.status === "complete" ? "Done" : section.status === "draft" ? "Started" : "Not yet"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
