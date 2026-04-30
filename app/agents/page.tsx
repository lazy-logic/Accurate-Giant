/**
 * /agents — full agent locator.
 *
 * Two-column on desktop: scrollable agent list on the left, sticky map on
 * the right. Clicking a list item flies the map to the pin and highlights
 * it; clicking a pin scrolls the list and highlights the same row. State
 * lives in the AgentLocator client component below the page wrapper.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AgentLocator } from "@/components/agents/AgentLocator";
import { agents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Find an agent",
  description:
    "Live map of every approved Accurate Giant lotto agent across Accra. Search by area, see opening hours and contact details.",
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agents"
        title={`${agents.length}+ approved agents across Accra.`}
        subtitle="Every agent on this map is NLA-approved. Click a pin to see the address and opening hours, or browse the list below."
      />

      <AgentLocator agents={agents} />
    </>
  );
}
