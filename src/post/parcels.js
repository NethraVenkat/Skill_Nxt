import { useMemo } from "react";
import { LETTERS, letterById, sentencesOf } from "../data/content";
import { today, useStore } from "../state/store";

/**
 * Parcels: what is in the courier's bag, ready to deliver. A letter only becomes a parcel once the
 * courier has packed their own 3 notes for it (the 3-Note Trick). Also the notes made in the lesson
 * (the dog paragraph) and today's Daily Postcard.
 */
export function useParcels() {
  const { packed, myNotes, postcard } = useStore();
  return useMemo(() => {
    const list = [];
    if (postcard?.day === today() && postcard.notes.every((n) => n.trim()))
      list.push({
        id: "postcard",
        icon: "💌",
        title: `Today’s Postcard: ${postcard.topic}`,
        topic: postcard.topic,
        notes: postcard.notes,
      });
    LETTERS.forEach((l) => {
      if (packed[l.id])
        list.push({
          id: l.id,
          icon: l.icon,
          title: l.topic,
          topic: l.topic,
          notes: packed[l.id],
          letter: l,
          sentences: sentencesOf(l.text),
        });
    });
    if (myNotes.every((n) => n.trim()) && !packed.dogs) {
      const l = letterById("dogs");
      list.push({
        id: "mine",
        icon: "📝",
        title: "My lesson notes (Dogs)",
        topic: "Dogs",
        notes: myNotes,
        letter: l,
        sentences: sentencesOf(l.text),
      });
    }
    return list;
  }, [packed, myNotes, postcard]);
}

/** Pick a parcel by id, or the first one. */
export const pickParcel = (parcels, id) =>
  parcels.find((p) => p.id === id) ?? parcels[0] ?? null;
