/**
 * ReeveOS Mobile — Design System
 * 
 * Brand: ReeveOS (#111111, #C9A84C, Figtree)
 * Spacing: iOS Settings + Dojo Sidekick rules
 * 
 * Page bg: #F2F2F7 (iOS system grouped grey)
 * Cards: #FFFFFF, 10px radius, no borders — bg contrast does the work
 * Text: 17px body min, 14px secondary, 13px section headers
 * Dividers: 0.5px #C6C6C8, inset
 * Section gap: 32px
 */

export const DS = {
  // Colours — brand
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",

  // Colours — system
  bg: "#F2F2F7",       // page background (iOS system grey)
  card: "#FFFFFF",      // section cards
  muted: "#8E8E93",     // secondary text (iOS grey)
  divider: "#C6C6C8",   // 0.5px dividers
  subtle: "#E5E5EA",    // lighter borders
  green: "#34C759",     // success (iOS green)
  red: "#FF3B30",       // destructive (iOS red)

  // Typography (all Figtree)
  font: "'Figtree', -apple-system, BlinkMacSystemFont, sans-serif",
  pageTitle: { fontSize: 22, fontWeight: 700 as const },
  sectionTitle: { fontSize: 17, fontWeight: 700 as const },
  body: { fontSize: 17, fontWeight: 400 as const },
  bodyBold: { fontSize: 17, fontWeight: 600 as const },
  secondary: { fontSize: 14, fontWeight: 500 as const },
  sectionHeader: { fontSize: 13, fontWeight: 600 as const, letterSpacing: 0.5, textTransform: "uppercase" as const },
  caption: { fontSize: 12, fontWeight: 500 as const },

  // Spacing
  sectionGap: 32,       // between sections
  cardRadius: 10,       // card corner radius
  cardPadding: 16,      // inside cards
  pageMargin: 16,       // horizontal margin
  rowHeight: 44,        // minimum row height
  rowHeightLarge: 72,   // featured rows (profile, etc.)
  dividerInset: 16,     // divider left inset inside cards
} as const;

// Inline style helper for section card
export const cardStyle = {
  backgroundColor: DS.card,
  borderRadius: DS.cardRadius,
  marginLeft: DS.pageMargin,
  marginRight: DS.pageMargin,
  overflow: "hidden" as const,
};

// Inline style for inset divider inside cards
export const dividerStyle = {
  height: 0.5,
  backgroundColor: DS.divider,
  marginLeft: DS.dividerInset,
};
