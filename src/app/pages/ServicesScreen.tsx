import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

export function ServicesScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: apiServices } = useApi<any[]>(businessId ? `/services/business/${businessId}/services` : null);

  const services = (apiServices || []).map((s: any, i: number) => ({
    id: s.id || i, cat: s.category || 'Uncategorised', name: s.name || 'Service',
    duration: `${s.duration || 0} min`, price: s.price || 0, active: s.active !== false, bookings: 0,
  }));

  const categories = useMemo(() => {
    const cats = new Set(services.map((s: any) => s.cat));
    return Array.from(cats);
  }, [services]);

  const [activeTab, setActiveTab] = useState(categories[0] || "All");
  const filtered = services.filter((s: any) => s.cat === activeTab);
  const activeCount = services.filter((s) => s.active).length;
  const avgPrice = Math.round(services.filter((s) => s.active).reduce((a, s) => a + s.price, 0) / activeCount);

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1 as any)}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", letterSpacing: -0.3 }}>Services & Pricing</p>
          <div className="flex-1" />
          <button className="w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform" style={{ backgroundColor: "#C9A84C", boxShadow: "0 4px 12px rgba(201,168,76,0.3)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          {[
            { label: "Active", value: String(activeCount) },
            { label: "Avg Price", value: `£${avgPrice}` },
            { label: "Categories", value: String(categories.length) },
          ].map((s) => (
            <div key={s.label} className="flex-1 py-2.5 px-2.5 rounded-[14px] text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#111111", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 8, fontWeight: 600, color: "#999999", marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 px-5 pt-2 pb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className="px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all"
            style={{
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: activeTab === cat ? "#111111" : "#FFFFFF",
              color: activeTab === cat ? "#C9A84C" : "#999999",
              border: activeTab === cat ? "none" : "1px solid #F0F0F0",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service List */}
      <div className="flex-1 px-5 pt-2 pb-28 space-y-2">
        {filtered.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`rounded-[12px] px-3.5 py-3 flex items-center gap-3 ${!svc.active ? "opacity-50" : ""}`}
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}
          >
            <div className="w-[3px] self-stretch rounded-full shrink-0" style={{ backgroundColor: svc.active ? "#6BAF7C" : "#F0F0F0" }} />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold tracking-tight truncate" style={{ color: "#111111" }}>{svc.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span style={{ fontSize: 10, fontWeight: 500, color: "#999999" }}>{svc.duration}</span>
                <span style={{ fontSize: 10, color: "#F0F0F0" }}>·</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#CCCCCC" }}>{svc.bookings} bookings</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p style={{ fontSize: 14, fontWeight: 800, color: "#111111", letterSpacing: -0.5 }}>£{svc.price}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M4.5 3l3 3-3 3" stroke="#CCCCCC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}