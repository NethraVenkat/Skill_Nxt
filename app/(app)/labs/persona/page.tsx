import { NovaSays } from "@/components/nova";
import { PersonaBuilder } from "@/components/labs/persona-builder";
import { Term } from "@/components/term";

export default function PersonaLabPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Lab · play with ideas</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Customer card 🧑‍🎓</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Picture ONE real type of customer. Tap the words that describe them and set their budget.</p>
      </div>
      <NovaSays>
        This card is called a <Term id="persona">persona</Term>. When you can picture one real person, it&apos;s much easier to help them.
      </NovaSays>
      <PersonaBuilder />
    </div>
  );
}
