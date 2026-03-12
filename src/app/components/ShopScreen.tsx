import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#999999",
  subtle: "#F0F0F0",
  green: "#6BAF7C",
};

  const categories = useMemo(() => {
    const cats = new Set(products.map((p: any) => p.cat));
    return ['All', ...Array.from(cats)];
  }, [products]);

export function ShopScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: apiProducts } = useApi<any[]>(businessId ? `/shop/business/${businessId}/products` : null);

  const products = (apiProducts || []).map((p: any, i: number) => ({
    id: p.id || i, cat: p.category || 'Other', name: p.name || 'Product',
    price: p.price || 0, stock: p.stock ?? 99, img: p.image || '', badge: p.stock <= 5 ? 'Low Stock' : '',
  }));
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered = activeTab === "All" ? products : products.filter((p) => p.cat === activeTab);
  const totalInventory = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1 as any)}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: C.subtle }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1">
            <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>Shop</p>
            <p style={{ fontSize: 10, fontWeight: 500, color: C.muted }}>Products, gift cards & inventory</p>
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform" style={{ backgroundColor: C.gold, boxShadow: "0 4px 12px rgba(201,168,76,0.3)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-2">
          {[
            { label: "Products", value: String(products.length) },
            { label: "In Stock", value: String(totalInventory) },
            { label: "Low Stock", value: String(lowStock), alert: lowStock > 0 },
          ].map((s) => (
            <div key={s.label} className="flex-1 py-2.5 px-2.5 rounded-[14px] text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: (s as any).alert ? "#EF4444" : C.dark, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 8, fontWeight: 600, color: C.muted, marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 px-5 pb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className="px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all"
            style={{
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: activeTab === cat ? C.dark : "#FFFFFF",
              color: activeTab === cat ? C.gold : C.muted,
              border: activeTab === cat ? "none" : `1px solid ${C.subtle}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1 px-5 pb-28">
        <div className="grid grid-cols-2 gap-2.5">
          {filtered.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedProduct(product)}
              className="rounded-[14px] overflow-hidden text-left active:scale-[0.97] transition-transform"
              style={{ border: `1px solid ${C.subtle}`, backgroundColor: "#FFFFFF" }}
            >
              {/* Image */}
              {product.img ? (
                <div className="h-[100px] overflow-hidden relative" style={{ backgroundColor: "#F8F8F8" }}>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  {product.badge && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full" style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: product.badge === "Low Stock" ? "#EF4444" : C.gold,
                      backgroundColor: product.badge === "Low Stock" ? "#FEE2E2" : C.goldLight,
                    }}>
                      {product.badge}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[100px] flex items-center justify-center relative" style={{ backgroundColor: C.goldLight }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="3" stroke={C.gold} strokeWidth="1.5" />
                    <path d="M10 6V4.5a4 4 0 018 0V6" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 14h6" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {product.badge && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full" style={{ fontSize: 8, fontWeight: 800, color: C.gold, backgroundColor: "rgba(255,255,255,0.8)" }}>
                      {product.badge}
                    </div>
                  )}
                </div>
              )}
              {/* Info */}
              <div className="p-2.5">
                <p className="truncate" style={{ fontSize: 11, fontWeight: 700, color: C.dark, lineHeight: 1.3 }}>{product.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p style={{ fontSize: 14, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>£{product.price}</p>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: product.stock <= 5 ? "#EF4444" : C.muted,
                  }}>
                    {product.stock <= 5 ? `${product.stock} left` : `${product.stock} in stock`}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Revenue card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-[14px] p-3.5"
          style={{ border: `1px solid ${C.subtle}`, backgroundColor: "#FFFFFF" }}
        >
          <p style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>This Month</p>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -1, lineHeight: 1 }}>£{products.reduce((s: number, p: any) => s + p.price, 0).toLocaleString()}</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: C.muted, marginTop: 2 }}>Product revenue</p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -1, lineHeight: 1 }}>84</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: C.muted, marginTop: 2 }}>Units sold</p>
            </div>
            <span className="flex items-center gap-0.5 px-2 py-1 rounded-full" style={{ fontSize: 10, fontWeight: 800, color: "#10B981", backgroundColor: "#10B98112" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/></svg>
              +22%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Product Detail Sheet */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/30 z-[200]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 rounded-t-[24px] z-[201]"
              style={{ backgroundColor: C.bg, boxShadow: "0 -12px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: C.subtle }} />
              </div>

              <div className="px-5 pb-3 flex items-start justify-between">
                <div className="flex-1">
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3, lineHeight: 1.2 }}>{selectedProduct.name}</h2>
                  <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 3 }}>{selectedProduct.cat}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3" style={{ backgroundColor: C.subtle }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Price</p>
                    <p style={{ fontSize: 24, fontWeight: 800, color: C.dark, letterSpacing: -1 }}>£{selectedProduct.price}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Stock</p>
                    <p style={{ fontSize: 24, fontWeight: 800, color: selectedProduct.stock <= 5 ? "#EF4444" : C.dark, letterSpacing: -1 }}>{selectedProduct.stock}</p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Quick Stats</p>
                <div className="flex gap-2">
                  {[
                    { label: "Sold (30d)", value: "12" },
                    { label: "Revenue", value: `£${selectedProduct.price * 12}` },
                    { label: "Reorder", value: selectedProduct.stock <= 5 ? "Yes" : "No" },
                  ].map((s) => (
                    <div key={s.label} className="flex-1 py-2 px-2.5 rounded-[10px] text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: C.dark, lineHeight: 1 }}>{s.value}</p>
                      <p style={{ fontSize: 7, fontWeight: 600, color: C.muted, marginTop: 3, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 flex gap-2" style={{ borderTop: `1px solid ${C.subtle}` }}>
                <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform" style={{ backgroundColor: C.dark }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Edit Product</span>
                </button>
                <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-md" style={{ backgroundColor: C.gold, boxShadow: "0 4px 12px rgba(201,168,76,0.3)" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>Sell Product</span>
                </button>
              </div>

              <div className="h-4" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
