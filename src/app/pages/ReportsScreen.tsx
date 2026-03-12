import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 540 },
  { day: "Wed", value: 420 },
  { day: "Thu", value: 680 },
  { day: "Fri", value: 780 },
  { day: "Sat", value: 920 },
  { day: "Sun", value: 210 },
];

const serviceBreakdown = [
  { name: "Balayage", pct: 34, revenue: 1260, color: "#C9A84C" },
  { name: "Cut & Style", pct: 22, revenue: 814, color: "#111111" },
  { name: "Highlights", pct: 18, revenue: 666, color: "#8B6914" },
  { name: "Treatments", pct: 14, revenue: 518, color: "#D4B483" },
  { name: "Other", pct: 12, revenue: 444, color: "#E5E7EB" },
];

const periods = ["Week", "Month", "Year"];

export function ReportsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: summary } = useApi<any>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const [period, setPeriod] = useState("Week");

  const total = summary?.period?.revenue || revenueData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-4">
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
          <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", letterSpacing: -0.3 }}>Reports & Analytics</p>
        </div>

        {/* Period Toggle */}
        <div className="flex gap-0.5 p-0.5 rounded-[10px] mb-4" style={{ backgroundColor: "#F0F0F0" }}>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-1.5 rounded-[8px] transition-all"
              style={{
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: period === p ? "#C9A84C" : "transparent",
                color: period === p ? "#FFFFFF" : "#999999",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Key Metric */}
        <div className="flex items-end justify-between">
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>Total Revenue</p>
            <div className="flex items-end gap-2">
              <p style={{ fontSize: 28, fontWeight: 800, color: "#111111", letterSpacing: -1, lineHeight: 1 }}>£{total.toLocaleString()}</p>
              <span className="flex items-center gap-0.5 mb-0.5" style={{ fontSize: 11, fontWeight: 800, color: "#6BAF7C" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/></svg>
                +18%
              </span>
            </div>
          </div>
          <div className="text-right">
            <p style={{ fontSize: 9, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1 }}>Avg/Day</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#111111", letterSpacing: -0.5, lineHeight: 1, marginTop: 2, opacity: 0.6 }}>£{Math.round(total / 7)}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 pt-4 pb-28 space-y-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[14px] p-3.5 border border-[#F0F0F0] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
        >
          <p className="text-[12px] font-black text-[#111] tracking-tight mb-3">Revenue This Week</p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={revenueData} margin={{ top: 2, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 9, fontWeight: 700, fill: "#BBB" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 8, fill: "#DDD" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#111", border: "none", borderRadius: 8, color: "#fff", fontSize: 11, fontWeight: 700 }}
                formatter={(v: any) => [`£${v}`, ""]}
                labelStyle={{ color: "#C9A84C" }}
              />
              <Area type="monotone" dataKey="value" stroke="#C9A84C" strokeWidth={2} fill="url(#gold)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Appointments", value: `${summary?.period?.bookings || '-'}`, sub: "", up: true },
            { label: "Avg Ticket", value: summary ? `£${Math.round(summary.period.revenue / Math.max(summary.period.bookings, 1))}` : '-', sub: "", up: true },
            { label: "No-Shows", value: `${summary?.today?.noShows || 0}`, sub: "", up: false },
            { label: "New Clients", value: `${summary?.today?.newClients || 0}`, sub: "", up: true },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              className="bg-white rounded-[12px] p-3 border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]"
            >
              <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1px] mb-1">{stat.label}</p>
              <p className="text-[20px] font-black text-[#111] tracking-tighter leading-none">{stat.value}</p>
              <p className={`text-[9px] font-bold mt-1 ${stat.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[14px] p-3.5 border border-[#F0F0F0] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
        >
          <p className="text-[12px] font-black text-[#111] tracking-tight mb-3">Top Services</p>
          <div className="space-y-2.5">
            {serviceBreakdown.map((svc, i) => (
              <div key={svc.name}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: svc.color }} />
                    <p className="text-[11px] font-bold text-[#111]">{svc.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-[#BBB]">{svc.pct}%</span>
                    <p className="text-[11px] font-black text-[#111]">£{svc.revenue}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${svc.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: svc.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Retention & Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-[14px] p-3.5 border border-[#F0F0F0] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
        >
          <p className="text-[12px] font-black text-[#111] tracking-tight mb-3">Client Health</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Retention", value: "-", color: "#10B981" },
              { label: "Avg Rating", value: "-", color: "#C9A84C" },
              { label: "Rebooking", value: "-", color: "#3B82F6" },
            ].map((m) => (
              <div key={m.label} className="text-center py-2 bg-[#F5F5F5] rounded-[10px]">
                <p className="text-[16px] font-black tracking-tighter leading-none" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[8px] font-bold text-[#BBB] uppercase tracking-[1px] mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}