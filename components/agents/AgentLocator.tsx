/**
 * AgentLocator — interactive agents page client surface.
 *
 * Two-column on lg+: scrollable list on the left, sticky map on the right.
 * Selecting a list item highlights the corresponding map pin (and vice
 * versa). The list filters by free-text search over name + area + address.
 *
 * State lives here rather than inside AgentMap so the list and map stay in
 * sync via the same source of truth.
 */
"use client";

import { useMemo, useRef, useState } from "react";
import { MapPin, Phone, Search, Clock } from "lucide-react";
import { AgentMap } from "./AgentMap";
import type { Agent } from "@/lib/agents";
import { cn } from "@/lib/utils";

export function AgentLocator({ agents }: { agents: Agent[] }) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agents;
    return agents.filter((a) =>
      [a.name, a.area, a.address].some((v) => v.toLowerCase().includes(q)),
    );
  }, [agents, query]);

  function selectAgent(agent: Agent) {
    setActiveId(agent.id);
    // Scroll the list to the selected item if needed
    const li = listRef.current?.querySelector<HTMLLIElement>(`[data-agent-id="${agent.id}"]`);
    li?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left: search + list */}
          <div className="lg:col-span-5">
            <label className="relative block">
              <span className="sr-only">Search agents</span>
              <Search
                size={18}
                strokeWidth={1.75}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink-muted"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by area, name, or address…"
                className="w-full h-12 pl-11 pr-4 rounded-full border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
              />
            </label>

            <p className="mt-4 text-xs text-brand-ink-muted tnum">
              Showing {filtered.length} of {agents.length} agents
            </p>

            <ul
              ref={listRef}
              className="mt-3 max-h-[600px] overflow-y-auto pr-1 space-y-2"
            >
              {filtered.length === 0 ? (
                <li className="rounded-lg border border-brand-border bg-brand-paper-muted p-6 text-center text-sm text-brand-ink-muted">
                  No agents match "{query}". Try a different area.
                </li>
              ) : (
                filtered.map((a) => (
                  <li
                    key={a.id}
                    data-agent-id={a.id}
                    className={cn(
                      "rounded-lg border bg-brand-paper p-4 cursor-pointer transition-all",
                      activeId === a.id
                        ? "border-brand-primary shadow-soft -translate-y-0.5"
                        : "border-brand-border hover:border-brand-border-strong",
                    )}
                    onClick={() => selectAgent(a)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                          activeId === a.id
                            ? "bg-brand-primary text-white"
                            : "bg-brand-paper-muted text-brand-primary",
                        )}
                      >
                        <MapPin size={16} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-brand-ink leading-tight">{a.name}</p>
                        <p className="text-xs text-brand-ink-muted mt-0.5">
                          {a.area}
                        </p>
                        <p className="text-sm text-brand-ink mt-2 leading-snug">{a.address}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-ink-muted">
                          {a.hours && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={12} strokeWidth={1.75} />
                              {a.hours}
                            </span>
                          )}
                          {a.phone && (
                            <a
                              href={`tel:${a.phone.replace(/\s+/g, "")}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-brand-primary hover:underline tnum"
                            >
                              <Phone size={12} strokeWidth={1.75} />
                              {a.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Right: map (sticky on lg+) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-brand-border overflow-hidden bg-brand-paper-muted h-[480px] md:h-[600px] lg:h-[680px]">
              <AgentMap
                agents={filtered}
                activeId={activeId}
                onSelectAgent={(a) => selectAgent(a)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
