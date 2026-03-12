/**
 * ReeveOS Mobile — Payment Screen (Live Data)
 * Uses AuthContext for user name
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0' };

export function PaymentScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');

  const handleDigit = (d: string) => {
    if (d === 'clear') return setAmount('');
    if (d === 'back') return setAmount(a => a.slice(0, -1));
    if (d === '.' && amount.includes('.')) return;
    if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
    setAmount(a => a + d);
  };

  const displayAmount = amount ? `£${amount}` : '£0.00';

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Take Payment</h1>
        </div>
        <div className="flex flex-col items-center py-6">
          <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>Charging as {user?.name ?? 'Business'}</p>
          <p style={{ fontSize: 48, fontWeight: 800, color: C.dark, letterSpacing: -2, marginTop: 8 }}>{displayAmount}</p>
        </div>
      </div>
      <div className="flex-1 px-5 pb-28">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {['1','2','3','4','5','6','7','8','9','.','0','back'].map(d => (
            <button key={d} onClick={() => handleDigit(d)}
              className="py-4 rounded-[14px] flex items-center justify-center active:scale-95 transition-transform"
              style={{ backgroundColor: d === 'back' ? C.subtle : '#FFFFFF', border: `1px solid ${C.subtle}` }}>
              {d === 'back' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round"><path d="M15 4H8l-5 6 5 6h7a2 2 0 002-2V6a2 2 0 00-2-2z" /><path d="M12 8l-4 4M8 8l4 4" /></svg>
              ) : (
                <span style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>{d}</span>
              )}
            </button>
          ))}
        </div>
        <button disabled={!amount || parseFloat(amount) === 0}
          className="w-full py-4 rounded-[14px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform disabled:opacity-40"
          style={{ backgroundColor: C.gold }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="14" height="10" rx="2" /><path d="M2 8h14" /></svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Charge {displayAmount}</span>
        </button>
      </div>
    </div>
  );
}
