/**
 * AgentMap — Mapbox-powered map showing agent pins across Accra.
 *
 * Client component (Mapbox needs DOM). Imports the Mapbox CSS once;
 * Next.js bundles it correctly because the import lives inside a "use client"
 * module.
 *
 * Behaviour:
 *  - Renders pins for every agent in the `agents` prop
 *  - Each pin is custom-styled (CSS dot + ring) so it matches the brand
 *  - Click a pin → calls onSelectAgent(agent) AND opens a popup with name,
 *    area, address, phone, hours
 *  - Highlights the activeId pin with a larger ring
 *  - Refits bounds whenever the agent list changes
 *
 * Graceful degradation: if NEXT_PUBLIC_MAPBOX_TOKEN is missing, renders a
 * brand-tinted placeholder with a helpful message rather than crashing.
 *
 * Style choice: mapbox/light-v11 — light desaturated tiles that recede so
 * the brand-coloured pins read as the focal point.
 */
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { type Agent, ACCRA_CENTER } from "@/lib/agents";
import { cn } from "@/lib/utils";

/*
 * Bug fix (2026-04-30): pins were flickering on hover because the parent
 * passed `onSelectAgent` as an inline function, which is a new reference on
 * every parent render. That reference was a dependency of the markers
 * useEffect, so the effect tore down and re-created every marker on every
 * parent render — producing the flicker. We now store the callback in a ref
 * (kept up to date via a separate effect) and the markers effect depends
 * only on the `agents` array.
 */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Props = {
  agents: Agent[];
  activeId?: string | null;
  onSelectAgent?: (agent: Agent) => void;
  className?: string;
  /** Disable interaction (drag/zoom). Useful for the homepage preview. */
  interactive?: boolean;
  /** Show controls (compass/zoom). Defaults to true on full maps. */
  showControls?: boolean;
};

export function AgentMap({
  agents,
  activeId = null,
  onSelectAgent,
  className,
  interactive = true,
  showControls = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  // Stable handle for onSelectAgent — keeps the markers effect from re-running
  // every time the parent passes a new inline function reference.
  const onSelectAgentRef = useRef(onSelectAgent);
  useEffect(() => {
    onSelectAgentRef.current = onSelectAgent;
  }, [onSelectAgent]);

  // Initialise map once.
  useEffect(() => {
    if (!TOKEN || !containerRef.current) return;
    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [ACCRA_CENTER.lng, ACCRA_CENTER.lat],
      zoom: 11,
      interactive,
      attributionControl: false,
    });

    if (showControls) {
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    }
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, [interactive, showControls]);

  // Sync markers whenever agents change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    // Add fresh markers
    agents.forEach((agent) => {
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", `${agent.name}, ${agent.area}`);
      el.className = [
        "agent-pin",
        "relative block w-7 h-7 rounded-full bg-[#013299] border-[3px] border-white",
        "shadow-[0_4px_10px_rgba(1,50,153,0.45)]",
        "transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#013299]/40",
      ].join(" ");

      const popup = new mapboxgl.Popup({
        offset: 18,
        closeButton: false,
        className: "agent-popup",
      }).setHTML(
        `<div style="font-family:var(--font-inter,sans-serif);min-width:180px">
           <p style="font-weight:700;font-size:14px;color:#1a1f2b;margin:0 0 2px">${escapeHtml(agent.name)}</p>
           <p style="font-size:11px;color:#5b6473;margin:0 0 6px">${escapeHtml(agent.area)}</p>
           <p style="font-size:12px;color:#1a1f2b;margin:0 0 4px">${escapeHtml(agent.address)}</p>
           ${agent.hours ? `<p style="font-size:11px;color:#5b6473;margin:4px 0 0">${escapeHtml(agent.hours)}</p>` : ""}
         </div>`,
      );

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([agent.lng, agent.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectAgentRef.current?.(agent);
      });

      markersRef.current.set(agent.id, marker);
    });

    // Fit bounds to all pins (with padding) only if we have multiple
    if (agents.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      agents.forEach((a) => bounds.extend([a.lng, a.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 13, duration: 0 });
    }
    // Note: `onSelectAgent` deliberately omitted — see ref pattern above.
  }, [agents]);

  // Highlight the active pin via a CSS class only — never write inline
  // transform, because hover styles use `transform: scale(...)` and the
  // two would fight each other and flicker. The .agent-pin--active class
  // (declared in globals.css) handles scale + z-index together.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      el.classList.toggle("agent-pin--active", id === activeId);
    });
  }, [activeId]);

  if (!TOKEN) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-brand-paper-muted border border-brand-border rounded-lg p-10 text-center text-sm text-brand-ink-muted",
          className,
        )}
      >
        <div>
          <p className="font-bold text-brand-ink mb-2">Map unavailable</p>
          <p>
            Set <code className="font-mono text-xs bg-brand-paper-sunken px-1.5 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> in your <code>.env.local</code> to enable the map.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className={cn("w-full h-full", className)} />;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
