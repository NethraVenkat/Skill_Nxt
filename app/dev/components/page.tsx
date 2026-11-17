"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatTile } from "@/components/ui/stat-tile";
import { Toast } from "@/components/ui/toast";

export default function ComponentsShowcasePage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Dev-only</p>
        <h2 className="mt-1 text-3xl font-semibold text-text">Component gallery</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Cash" value="₹8.2L" change="+₹12k" changeTone="positive" />
        <StatTile label="Runway" value="9.4m" change="Healthy" changeTone="positive" />
        <StatTile label="Customers" value="18" change="+3" changeTone="positive" />
        <StatTile label="Reviews" value="4.8/5" change="Stable" changeTone="neutral" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons and badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input placeholder="Company name" />
              <Select defaultValue="first-time founder">
                <option value="first-time founder">First-time founder</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar value={72} />
            <div className="mt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empty state</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState title="No missions yet" description="Complete your first onboarding to unlock the first real-world mission." />
          </CardContent>
        </Card>
      </div>

      <Toast message="Account saved successfully." tone="success" open={true} onDismiss={() => undefined} />
      <Modal open={false} onClose={() => undefined} title="Preview dialog" >
        <p className="text-sm text-text-secondary">This modal is hidden in the gallery but ready for future states.</p>
      </Modal>
    </div>
  );
}
