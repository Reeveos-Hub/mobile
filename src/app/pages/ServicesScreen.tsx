import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const categories = ["Hair", "Colour", "Treatments", "Nails", "Add-Ons"];

const services = [
  { id: 1, cat: "Hair", name: "Ladies Cut & Blow Dry", duration: "60 min", price: 55, active: true, bookings: 34 },
  { id: 2, cat: "Hair", name: "Gents Cut", duration: "30 min", price: 28, active: true, bookings: 48 },
  { id: 3, cat: "Hair", name: "Children's Cut (Under 12)", duration: "30 min", price: 18, active: true, bookings: 12 },
  { id: 12, cat: "Hair", name: "Blow Dry Only", duration: "30 min", price: 25, active: true, bookings: 22 },
  { id: 4, cat: "Colour", name: "Full Head Highlights", duration: "120 min", price: 145, active: true, bookings: 28 },
  { id: 5, cat: "Colour", name: "Balayage", duration: "150 min", price: 175, active: true, bookings: 41 },
  { id: 6, cat: "Colour", name: "Root Touch-Up", duration: "60 min", price: 65, active: true, bookings: 36 },
  { id: 7, cat: "Colour", name: "Toner", duration: "30 min", price: 35, active: false, bookings: 8 },
  { id: 13, cat: "Colour", name: "Full Head Colour", duration: "90 min", price: 95, active: true, bookings: 19 },
  { id: 8, cat: "Treatments", name: "Keratin Smoothing", duration: "120 min", price: 195, active: true, bookings: 15 },
  { id: 9, cat: "Treatments", name: "Deep Conditioning", duration: "45 min", price: 40, active: true, bookings: 24 },
  { id: 14, cat: "Treatments", name: "Scalp Treatment", duration: "30 min", price: 35, active: true, bookings: 9 },
  { id: 10, cat: "Nails", name: "Gel Manicure", duration: "60 min", price: 45, active: true, bookings: 31 },
  { id: 11, cat: "Nails", name: "Pedicure", duration: "75 min", price: 50, active: true, bookings: 18 },
  { id: 15, cat: "Add-Ons", name: "Olaplex Treatment", duration: "15 min", price: 25, active: true, bookings: 42 },
  { id: 16, cat: "Add-Ons", name: "Head Massage", duration: "10 min", price: 15, active: true, bookings: 56 },
];

export function ServicesScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hair");

  const filtered = services.filter((s) => s.cat === activeTab);
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