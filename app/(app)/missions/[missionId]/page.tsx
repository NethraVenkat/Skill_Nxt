import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import missionCatalog from "@/content/missions";

import { notFound } from "next/navigation";

export function generateStaticParams() {
  return missionCatalog.map((mission) => ({ missionId: mission.id }));
}

export default async function MissionDetailPage({ params }: { params: Promise<{ missionId: string }> }) {
  const { missionId } = await params;
  const mission = missionCatalog.find((item) => item.id === missionId);
  if (!mission) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">Real-life task</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">{mission.title}</h2>
        </div>
        <Link href="/missions">
          <Button variant="secondary">Back to missions</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-text-secondary">{mission.goal}</p>
            <div className="flex flex-wrap gap-2">
              {mission.conceptTags.map((tag) => (
                <Badge key={tag} tone="default">{tag}</Badge>
              ))}
            </div>
            <div className="rounded-card border border-border bg-tint/70 p-4">
              <p className="text-sm font-medium text-text">Why it matters</p>
              <p className="mt-2 text-sm text-text-secondary">{mission.whyItMatters}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-text-secondary">
            <div className="flex items-center justify-between">
              <span>Difficulty</span>
              <Badge tone={mission.difficulty === "hard" ? "warning" : "success"}>{mission.difficulty}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Time</span>
              <span className="font-medium text-text">{mission.timeEstimateMinutes} mins</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Budget</span>
              <span className="font-medium text-text">₹{mission.costEstimateInr}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Badge</span>
              <span className="font-medium text-text">{mission.badge}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to complete it</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-text-secondary">
            {mission.instructions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proof required</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-text-secondary">
            {mission.proofRequirements.map((proof) => (
              <li key={proof.id} className="flex items-start justify-between gap-3 rounded-control border border-border bg-tint/50 p-3">
                <div>
                  <p className="font-medium text-text">{proof.label}</p>
                  <p>{proof.description}</p>
                </div>
                <Badge tone={proof.required ? "success" : "default"}>{proof.required ? "Required" : "Optional"}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
