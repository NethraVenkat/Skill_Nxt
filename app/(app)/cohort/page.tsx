import { Badge } from "@/components/ui/badge";
import { InviteButton } from "@/components/invite-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cohortMembers, cohortMetrics, getCohortReadinessScore, peerReviews } from "@/lib/cohort";

export default function CohortPage() {
  const readiness = getCohortReadinessScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Learn together</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Your Cohort</h2>
        </div>
        <InviteButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-text">{cohortMetrics.participation}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-text">{cohortMetrics.feedbackQuality.toFixed(1)}/5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Demo readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-text">{cohortMetrics.demoReadiness}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Readiness score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-text">{readiness}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Peer review</CardTitle>
              <Badge tone="default">Week 3</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {peerReviews.map((review) => (
              <div key={`${review.reviewer}-${review.venture}`} className="rounded-control border border-border bg-surface/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-text">{review.venture}</p>
                  <Badge tone="success">{review.score.toFixed(1)}/5</Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">Reviewed by {review.reviewer}</p>
                <p className="mt-2 text-sm text-text">{review.note}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-primary">Next action</p>
                <p className="mt-1 text-sm text-text-secondary">{review.nextAction}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cohort mates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cohortMembers.map((member) => (
              <div key={member.name} className="rounded-control border border-border bg-surface/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-text">{member.name}</p>
                  <Badge tone={member.confidence >= 80 ? "success" : "warning"}>{member.confidence}%</Badge>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{member.venture}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">Focus</p>
                <p className="mt-1 text-sm text-text">{member.focus}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">Next milestone</p>
                <p className="mt-1 text-sm text-text-secondary">{member.nextMilestone}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
