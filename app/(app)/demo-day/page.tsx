import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoDaySchedule, getCohortReadinessScore } from "@/lib/cohort";

export default function DemoDayPage() {
  const readiness = getCohortReadinessScore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Show your idea</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Demo Day</h2>
        </div>
        <Link href="/roleplay/investor">
          <Button variant="secondary">Practise my pitch</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-text">{readiness}%</p>
            <p className="mt-2 text-sm text-text-secondary">Your cohort is ready for a clear takeaway story and feedback loop.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-text">Friday, 7:00 PM</p>
            <p className="mt-2 text-sm text-text-secondary">Peer feedback and one-minute story workshop.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-text">5–8 founders</p>
            <p className="mt-2 text-sm text-text-secondary">Short, honest feedback and investor-style questions.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoDaySchedule.map((slot) => (
            <div key={`${slot.founder}-${slot.time}`} className="flex items-center justify-between gap-4 rounded-control border border-border bg-surface/70 p-3">
              <div>
                <p className="font-medium text-text">{slot.founder} · {slot.venture}</p>
                <p className="text-sm text-text-secondary">{slot.stage}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span>{slot.time}</span>
                <Badge tone={slot.score >= 85 ? "success" : "warning"}>{slot.score}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
