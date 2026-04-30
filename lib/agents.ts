/**
 * Mock agent location data for the locator map.
 *
 * Coordinates approximate well-known Accra neighbourhoods. When the agents
 * Supabase table is populated by the owner (content-inventory.md §4 item 4),
 * swap this for an async fetcher in lib/data.ts mirroring the games/draws
 * pattern.
 *
 * Lat/lng are decimal degrees (Mapbox order is [lng, lat] in calls).
 */
export type Agent = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
};

// Greater Accra centre (approximate)
export const ACCRA_CENTER = { lng: -0.186964, lat: 5.6037 };

export const agents: Agent[] = [
  {
    id: "ag-001",
    name: "Adabraka Lotto Stand",
    area: "Adabraka",
    address: "Kojo Thompson Rd, near Farisco Hotel",
    phone: "+233 24 555 0101",
    hours: "Mon–Sun · 7am–10pm",
    lat: 5.5557,
    lng: -0.2074,
  },
  {
    id: "ag-002",
    name: "Osu Mama Joy",
    area: "Osu",
    address: "Oxford St, opposite Frankie's",
    phone: "+233 20 555 0102",
    hours: "Mon–Sun · 8am–11pm",
    lat: 5.5553,
    lng: -0.1819,
  },
  {
    id: "ag-003",
    name: "Madina Market Booth",
    area: "Madina",
    address: "Madina Market, Stall 14",
    phone: "+233 24 555 0103",
    hours: "Mon–Sat · 6am–8pm",
    lat: 5.6837,
    lng: -0.1665,
  },
  {
    id: "ag-004",
    name: "East Legon Express",
    area: "East Legon",
    address: "American House Junction",
    phone: "+233 55 555 0104",
    hours: "Mon–Sun · 7am–11pm",
    lat: 5.6306,
    lng: -0.1574,
  },
  {
    id: "ag-005",
    name: "Kanda Hub",
    area: "Kanda",
    address: "Kanda Highway, near AG HQ",
    phone: "+233 24 555 0105",
    hours: "Mon–Sun · 7am–10pm",
    lat: 5.5751,
    lng: -0.1932,
  },
  {
    id: "ag-006",
    name: "Cantonments Corner",
    area: "Cantonments",
    address: "1st Crescent, near Polo Club",
    phone: "+233 20 555 0106",
    hours: "Mon–Sat · 8am–9pm",
    lat: 5.5664,
    lng: -0.1756,
  },
  {
    id: "ag-007",
    name: "Spintex Plaza",
    area: "Spintex",
    address: "Spintex Rd, Coastal Estates",
    phone: "+233 55 555 0107",
    hours: "Mon–Sun · 7am–10pm",
    lat: 5.6249,
    lng: -0.1167,
  },
  {
    id: "ag-008",
    name: "Achimota Mall Booth",
    area: "Achimota",
    address: "Achimota Retail Centre, Stand 22",
    phone: "+233 24 555 0108",
    hours: "Mon–Sun · 9am–9pm",
    lat: 5.6189,
    lng: -0.2321,
  },
  {
    id: "ag-009",
    name: "Dansoman Last Stop",
    area: "Dansoman",
    address: "Dansoman Last Stop, lorry station",
    phone: "+233 20 555 0109",
    hours: "Mon–Sun · 6am–9pm",
    lat: 5.5358,
    lng: -0.2483,
  },
  {
    id: "ag-010",
    name: "Lapaz Junction",
    area: "Lapaz",
    address: "Lapaz Roundabout, Awoshie Rd",
    phone: "+233 55 555 0110",
    hours: "Mon–Sun · 6am–10pm",
    lat: 5.6019,
    lng: -0.2379,
  },
  {
    id: "ag-011",
    name: "Airport Residential",
    area: "Airport Residential",
    address: "Airport Bypass Rd, near Marina Mall",
    phone: "+233 24 555 0111",
    hours: "Mon–Sat · 8am–8pm",
    lat: 5.6005,
    lng: -0.1745,
  },
  {
    id: "ag-012",
    name: "Tema Community 1",
    area: "Tema",
    address: "Community 1, Site 12",
    phone: "+233 20 555 0112",
    hours: "Mon–Sun · 7am–9pm",
    lat: 5.6698,
    lng: -0.0166,
  },
];
