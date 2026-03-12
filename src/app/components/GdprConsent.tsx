/**
 * ReeveOS Mobile — GDPR Consent Screen
 * Compact single-screen layout. UK GDPR / ICO compliant.
 */
import React, { useState } from 'react';
import { BRAND, FONT } from '../lib/brand';

interface GdprConsentProps { onConsent: () => void; }

export function GdprConsent({ onConsent }: GdprConsentProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div style={{
      position:'fixed', inset:0, display:'flex', flexDirection:'column',
      backgroundColor:BRAND.white, fontFamily:FONT.family,
      overflow:'hidden', overscrollBehavior:'none' as any,
      padding:'0 24px',
    }}>
      {/* Status bar spacer */}
      <div style={{ height:48, flexShrink:0 }} />

      {/* R. Mark */}
      <div style={{ width:40, height:40, borderRadius:10, backgroundColor:BRAND.black, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
        <span style={{ color:BRAND.gold, fontSize:20, fontWeight:800 }}>R.</span>
      </div>

      <h1 style={{ fontSize:22, fontWeight:800, color:BRAND.black, margin:'0 0 6px', lineHeight:1.2 }}>Your Privacy Matters</h1>
      <p style={{ fontSize:13, fontWeight:500, color:'#8E8E93', lineHeight:1.5, margin:'0 0 16px' }}>
        We process your data under UK GDPR / ICO law. Here's what and why.
      </p>

      {/* What we collect */}
      <div style={{ backgroundColor:'#F2F2F7', borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
        <p style={{ fontSize:12, fontWeight:700, color:BRAND.black, margin:'0 0 8px' }}>What we collect:</p>
        {[
          ['Account details','Name & email for your account'],
          ['Business data','Bookings, clients, services'],
          ['Usage analytics','App usage to improve the product'],
        ].map(([l,d],i) => (
          <div key={i} style={{ display:'flex', gap:8, marginBottom:i<2?6:0, alignItems:'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:1}}><rect x="1" y="1" width="14" height="14" rx="3.5" stroke={BRAND.gold} strokeWidth="1.3"/><path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <span style={{ fontSize:13, fontWeight:600, color:BRAND.black }}>{l}</span>
              <span style={{ fontSize:12, color:'#8E8E93', marginLeft:4 }}>— {d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Your rights */}
      <div style={{ backgroundColor:'#F2F2F7', borderRadius:10, padding:'12px 14px', marginBottom:16 }}>
        <p style={{ fontSize:12, fontWeight:700, color:BRAND.black, margin:'0 0 8px' }}>Your rights:</p>
        {[
          'Access, correct, or delete your data anytime',
          'Withdraw consent and close your account',
          'Request a full data export',
          'Complain to the ICO (ico.org.uk)',
        ].map((t,i) => (
          <div key={i} style={{ display:'flex', gap:8, marginBottom:i<3?4:0, alignItems:'center' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M3 8L6.5 11.5L13 4.5" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize:12, color:'#666', lineHeight:1.3 }}>{t}</span>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex:1 }} />

      {/* Consent checkbox */}
      <div onClick={() => setAccepted(!accepted)} style={{ display:'flex', gap:10, alignItems:'flex-start', cursor:'pointer', marginBottom:14 }}>
        <div style={{
          width:22, height:22, borderRadius:6, flexShrink:0, marginTop:1,
          border:`2px solid ${accepted?BRAND.gold:'#C6C6C8'}`,
          backgroundColor:accepted?BRAND.gold:BRAND.white,
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all 0.15s',
        }}>
          {accepted && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize:12, color:'#666', lineHeight:1.4 }}>
          I consent to ReeveOS processing my data as described, per the{' '}
          <span style={{ color:BRAND.gold, fontWeight:600 }}>Privacy Policy</span> and{' '}
          <span style={{ color:BRAND.gold, fontWeight:600 }}>Terms of Service</span>.
        </span>
      </div>

      {/* Continue button */}
      <button onClick={onConsent} disabled={!accepted} style={{
        width:'100%', padding:'16px 0', borderRadius:16, border:'none',
        backgroundColor:accepted?BRAND.black:'#E5E5EA',
        cursor:accepted?'pointer':'not-allowed',
        marginBottom:32, transition:'all 0.2s',
      }}>
        <span style={{ fontSize:15, fontWeight:700, color:accepted?BRAND.gold:'#8E8E93' }}>Continue</span>
      </button>
    </div>
  );
}
