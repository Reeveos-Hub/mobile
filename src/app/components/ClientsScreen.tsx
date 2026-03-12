import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const TIER_COLORS = ["#C9A84C", "#F59E0B", "#22C55E", "#EF4444", "#9333EA", "#3B82F6"];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase();
}

const tierColors: Record<string, string> = {
  VIP: "#C9A84C",
  Gold: "#F59E0B",
  Silver: "#9CA3AF",
};

export function ClientsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("History");

  const { data: apiData } = useApi<any>(businessId ? `/clients-v2/business/${businessId}` : null);
  const clients = (apiData?.clients || []).map((c: any, i: number) => ({
    name: c.name || 'Client',
    lastVisit: c.lastVisit ? new Date(c.lastVisit).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '-',
    spend: `£${(c.totalSpent || 0).toFixed(0)}`,
    visits: c.totalBookings || 0,
    color: TIER_COLORS[i % TIER_COLORS.length],
    tier: c.totalSpent >= 1000 ? 'VIP' : c.totalSpent >= 500 ? 'Gold' : c.totalSpent >= 200 ? 'Silver' : '',
  }));

  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const filtered = clients.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));

  if (selectedClient) {
    const tabs = ["History", "Forms", "Photos", "Notes"];
    return (
      <div className="flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
        {/* Client profile header */}
        <div className="px-5 pt-[56px] pb-3">
          <button onClick={() => setSelectedClient(null)} className="flex items-center gap-1 mb-3" style={{ minHeight: 36 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#C9A84C" }}>Clients</span>
          </button>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${selectedClient.color}40, ${selectedClient.color}15)` }}
            >
              <span style={{ fontSize: 15, fontWeight: 800, color: selectedClient.color }}>{getInitials(selectedClient.name)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p style={{ fontSize: 15, fontWeight: 800, color: "#111111", lineHeight: 1.2 }}>{selectedClient.name}</p>
                {selectedClient.tier && (
                  <span className="px-2 py-0.5" style={{ borderRadius: 6, fontSize: 9, fontWeight: 700, color: tierColors[selectedClient.tier], backgroundColor: `${tierColors[selectedClient.tier]}15` }}>
                    {selectedClient.tier}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#999999", marginTop: 1 }}>
                {selectedClient.visits} visits · {selectedClient.spend} lifetime
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-2 mt-3">
            {[
              { label: "Visits", value: String(selectedClient.visits) },
              { label: "Spent", value: selectedClient.spend },
              { label: "Last", value: selectedClient.lastVisit },
            ].map((s) => (
              <div key={s.label} className="flex-1 py-2 px-2.5" style={{ borderRadius: 10, backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: "#111111", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 8, fontWeight: 600, color: "#999999", marginTop: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-1.5 px-5 py-2.5">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2" style={{ borderRadius: 10, backgroundColor: "#C9A84C" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="10" rx="2" stroke="#FFFFFF" strokeWidth="1.3" />
              <path d="M1 6h12" stroke="#FFFFFF" strokeWidth="1.3" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFFFFF" }}>Book</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2" style={{ borderRadius: 10, border: "1.5px solid #F0F0F0" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 3.5l-7 7M3.5 3.5h7v7" stroke="#111111" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#111111" }}>Message</span>
          </button>
          <button className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid #F0F0F0" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="3.5" r="1" fill="#999" />
              <circle cx="7" cy="7" r="1" fill="#999" />
              <circle cx="7" cy="10.5" r="1" fill="#999" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 gap-0.5" style={{ borderBottom: "1px solid #F0F0F0" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="py-2 px-2.5"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: activeTab === tab ? "#111111" : "#CCCCCC",
                borderBottom: activeTab === tab ? "2px solid #C9A84C" : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-5 py-3">
          {activeTab === "History" && (
            <div className="flex flex-col gap-2">
              {[
                { s: "RF Needling", d: "Today 09:00", p: "£120", color: "#C9A84C" },
                { s: "Chemical Peel", d: "1 Mar 2026", p: "£85", color: "#6BAF7C" },
                { s: "Microneedling", d: "15 Feb 2026", p: "£95", color: "#F59E0B" },
                { s: "Consultation", d: "1 Feb 2026", p: "Free", color: "#9333EA" },
              ].map((h) => (
                <div
                  key={h.d}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{ borderRadius: 10, backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}
                >
                  <div className="self-stretch shrink-0" style={{ width: 2.5, borderRadius: 2, backgroundColor: h.color }} />
                  <div className="flex-1">
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111111" }}>{h.s}</p>
                    <p style={{ fontSize: 10, fontWeight: 500, color: "#999999", marginTop: 0.5 }}>{h.d}</p>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#111111" }}>{h.p}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab !== "History" && (
            <div className="flex flex-col items-center pt-12">
              <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#F0F0F0" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4v12" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-2" style={{ fontSize: 12, fontWeight: 600, color: "#BBB" }}>No {activeTab.toLowerCase()} yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="px-5 pt-[56px] pb-2.5" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="flex items-center gap-3 mb-2.5">
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#F0F0F0" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="flex-1" style={{ fontSize: 18, fontWeight: 800, color: "#111111", lineHeight: 1.2, letterSpacing: -0.3 }}>Clients</h1>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 10, fontWeight: 700, color: "#C9A84C" }}>{clients.length} total</span>
            <button className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: "#C9A84C" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderRadius: 10, backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="#BBB" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#BBB" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 12, fontWeight: 500, color: "#111111" }}
          />
        </div>
      </div>

      {/* Client list */}
      <div className="px-5 pb-4">
        {filtered.map((client, i) => (
          <motion.button
            key={client.name}
            onClick={() => setSelectedClient(client)}
            className="w-full flex items-center gap-2.5 py-2.5 text-left"
            style={{ borderBottom: "1px solid #F5F5F5", minHeight: 48 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${client.color}20, ${client.color}08)` }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: client.color }}>{getInitials(client.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate" style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>{client.name}</p>
                {client.tier && (
                  <span className="px-1.5 py-0.5 shrink-0" style={{ borderRadius: 4, fontSize: 8, fontWeight: 700, color: tierColors[client.tier], backgroundColor: `${tierColors[client.tier]}12` }}>
                    {client.tier}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 10, fontWeight: 500, color: "#999999", marginTop: 0.5 }}>Last: {client.lastVisit} · {client.visits} visits</p>
            </div>
            <div className="shrink-0 text-right">
              <p style={{ fontSize: 12, fontWeight: 500, color: "#111111" }}>{client.spend}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}