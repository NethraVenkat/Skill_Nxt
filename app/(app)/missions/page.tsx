import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import missionCatalog from "@/content/missions";

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Real-life tasks</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Missions 🚀</h2>
          <p className="mt-1 max-w-2xl text-text-secondary">Small tasks you do in the real world — like talking to 5 people. This is where learning turns into real skill.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {missionCatalog.map((mission) => (
          <Card key={mission.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{mission.title}</CardTitle>
                <Badge tone={mission.difficulty === "hard" ? "warning" : "success"}>{mission.difficulty === "easy" ? "Easy" : mission.difficulty === "medium" ? "Medium" : "Harder"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-text-secondary">{mission.goal}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                <span className="rounded-pill bg-mint/15 px-3 py-1 text-mint">💵 {mission.costEstimateInr === 0 ? "Free" : `About ₹${mission.costEstimateInr}`}</span>
                <span className="rounded-pill bg-sky/15 px-3 py-1 text-sky">⏱️ About {Math.round(mission.timeEstimateMinutes / 30) / 2} hours</span>
              </div>
              <Link href={`/missions/${mission.id}`}>
                <Button className="w-full">Open mission</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
