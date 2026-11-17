"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Shares (or copies) the VentureCraft link so a friend can join. No account needed. */
export function InviteButton() {
  const [copied, setCopied] = useState(false);

  const invite = async () => {
    const url = window.location.origin;
    const text = "Learn how startups work with me on VentureCraft — free, no sign-up!";
    try {
      if (navigator.share) {
        await navigator.share({ title: "VentureCraft", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // The person closed the share sheet or the clipboard is blocked — nothing to do.
    }
  };

  return (
    <Button variant="secondary" onClick={invite}>
      {copied ? <Check size={16} /> : <Share2 size={16} />} {copied ? "Link copied!" : "Invite a friend"}
    </Button>
  );
}
