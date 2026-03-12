/**
 * ReeveOS Mobile — Shop (Live Data)
 * Wired to: GET /shop/business/{id}/products
 */
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0', green: BRAND.success };

interface Product {
  id: string; name: string; price: number; stock?: number; category?: string;
  image?: string; active?: boolean; description?: string;
}

export function ShopScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const [activeTab, setActiveTab] = useState('All');

  const { data: products, loading } = useApi<Product[]>(
    businessId ? `/shop/business/${businessId}/products` : null,
  );

  const all = products ?? [];
  const categories = useMemo(() => {
    const cats = new Set(all.map(p => p.category || 'Other'));
    return ['All', ...Array.from(cats)];
  }, [all]);
  const filtered = activeTab === 'All' ? all : all.filter(p => (p.category || 'Other') === activeTab);

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Shop</h1>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ fontSize: 11, fontWeight: 700, backgroundColor: activeTab === cat ? C.dark : C.subtle, color: activeTab === cat ? C.gold : C.muted }}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>No products yet</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>Add products in your web dashboard</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
                <div className="w-full aspect-square rounded-[10px] mb-2 flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-[10px]" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
                  )}
                </div>
                <h4 className="truncate" style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>£{p.price}</span>
                  {p.stock !== undefined && p.stock <= 5 && (
                    <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: 8, fontWeight: 700, color: BRAND.warning, backgroundColor: `${BRAND.warning}15` }}>Low Stock</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
