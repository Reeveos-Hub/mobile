You are now Reeves UX, the lead designer at Reeves OS. Your entire career has been spent obsessing over consumer mobile apps for high-growth platforms like zero-commission booking and ordering systems for UK independents—nothing else. You hate generic apps. You hate flat interfaces, you hate native knockoffs that feel like 2010 iOS, you hate bloated dashboards, you hate sterile flows that waste time. Your job is to make the Reeve OS business app feel alive, fast, compelling—like a high street championing weapon for local services business owners. Hair Salons, Beauticians, nail bars, Barbers, Spa's and clinics, but its not a shity random bolt on which is an after though. www.reeveos.app is the main website and where client access the desktop webportal version 

# ReeveOS Mobile App — Figma Design Brief

**Prepared:** 10 March 2026 | **Confidential** | **For: UI/UX Designer**

---

## THE BRIEF IN ONE SENTENCE

Design a premium, AI-first mobile app for UK independent business owners — salon stylists, clinic practitioners, and self-employed operators — who are running their businesses from their phone between clients, at markets, and on the move. This is not a shrunken website. It's a tool that has to feel faster, smarter, and more alive than anything Fresha, Booksy, or Timely have ever shipped.

---

## WHY THIS MATTERS

The people who will use this app are not sitting at desks. They're standing at a till with wet hands. They're checking tomorrow's bookings while their kid eats breakfast. They're at a networking event trying to show a potential client how easy it is to book. If this app is slow, cluttered, or confusing for even one second — they'll go back to Fresha. We have to be better. We have to feel premium. We have to feel like the app actually knows them.

Every screen must pass this test: **"Can I do what I need with one thumb, in under 3 seconds, without thinking?"**

---

## BRAND IDENTITY

### The Brand

ReeveOS is the merchant/business-owner platform — dashboard, bookings, CRM, payments, merchant tools. The mobile app is for ReeveOS users only.

### Colour Palette — ReeveOS Mobile App

| Swatch | Hex | Usage |
|---|---|---|
| **Rich Black** | `#111111` | Primary backgrounds, headers, nav bars, primary buttons, text |
| **Gold** | `#C9A84C` | Accent — icons on dark backgrounds, active states, progress indicators, CTAs on black, highlights, badges |
| **White** | `#FFFFFF` | Card backgrounds, content areas, input fields |
| **Off-White** | `#FAFAF8` | Screen backgrounds, subtle separation |
| **Border** | `#EBEBEB` | Card borders, dividers, input borders |
| **Grey 400** | `#9CA3AF` | Secondary text, placeholder text, disabled states |
| **Grey 600** | `#666666` | Body text |
| **Success** | `#22C55E` | Confirmed bookings, online indicators, positive metrics |
| **Warning** | `#F59E0B` | Pending states, caution alerts |
| **Error** | `#EF4444` | No-shows, cancellations, destructive actions, overdue items |

### Typography

| Element | Font | Weight | Size (mobile) |
|---|---|---|---|
| **App-wide font** | Figtree | — | — |
| Screen titles | Figtree | 800 (ExtraBold) | 22px |
| Section headers | Figtree | 700 (Bold) | 16px |
| Card titles | Figtree | 700 (Bold) | 14px |
| Body text | Figtree | 500 (Medium) | 13px |
| Captions/labels | Figtree | 600 (SemiBold) | 11px |
| Micro text (badges) | Figtree | 700 (Bold) | 9-10px |

Figtree is the ONLY font. No fallbacks to Inter, Roboto, SF Pro, or system fonts in mockups. If Figtree isn't available in Figma, use the Google Fonts plugin to install it.

### Iconography

**MONOCHROME ONLY. NO EMOJIS. EVER.**

All icons must be monochrome SVG line icons. Consistent 1.5-2px stroke weight. No filled icons unless indicating an active/selected state. No colour icons. No emoji substitutes. No FontAwesome. Use a consistent icon set — Lucide, Feather, or custom SVG.

Icons on dark backgrounds: Gold `#C9A84C`
Icons on light backgrounds: Black `#111111` or Grey `#9CA3AF`

### The "R" Mark

The ReeveOS logo uses an "R" mark that appears in the top-left of the app.

- On dark backgrounds: Black circle, Gold "R", Gold dot
- On light backgrounds: Gold circle, Black "R", Black dot
- Always 32x32px minimum in the app header

### Spacing & Radius

| Element | Value |
|---|---|
| Screen padding | 16-20px horizontal |
| Card padding | 14-16px |
| Card border radius | 12-14px |
| Button border radius | 10px (standard), 99px (pill) |
| Input border radius | 10px |
| Avatar radius | 50% (circular) |
| Bottom tab bar height | 82px (with safe area) |
| Minimum tap target | 44x44px |

### Elevation & Shadows

Minimal. No heavy drop shadows. Subtle only.

- Cards: `0 2px 8px rgba(0,0,0,0.04)`
- Floating action button: `0 4px 16px rgba(17,17,17,0.3)`
- Bottom sheet: `0 -8px 40px rgba(0,0,0,0.15)`
- Modals: `0 20px 60px rgba(0,0,0,0.15)` + backdrop blur 4px

### Dark Mode Note

The app header/navigation is ALWAYS black `#111111` regardless of system theme. Content areas are white/off-white. There is no "dark mode" toggle — the black-and-gold header IS the premium look. Do not design a separate dark theme.

---

## TARGET USERS

### Primary: Natalie — Aesthetics Clinic Owner (Barry, Wales)

- Runs Rejuvenate Skin Experts with 4 staff (Grace, Emily, Jen + herself)
- Left Fresha because she couldn't own her client data
- Does microneedling, RF needling, chemical peels, polynucleotides
- Has 30 contacts wanting her academy platform
- Needs consultation forms, before/after photos, contraindication checks
- Checks her phone 50+ times a day between clients
- Wants to see tomorrow's schedule while lying in bed at night

### Secondary: Jamie — Hair Salon Owner (Nottingham)

- 15+ self-employed stylists renting chairs
- Needs the "Mothership" view — see all operators' performance from one screen
- Wants one professional-looking payment system, not 15 scattered card machines
- Cares about revenue split tracking and who's underperforming

### Tertiary: Self-Employed Stylist (Working in Jamie's Salon)

- Rents a chair at Jamie's salon, runs own mini-business
- Currently uses Fresha individually — salon owner can't see her bookings
- Wants her own portal, own clients, own revenue tracking
- Needs Stripe Tap to Pay on her iPhone — no separate card machine
- Wants to see exactly what she earned vs what the salon takes

---

## APP STRUCTURE

### Navigation: Bottom Tab Bar

5 tabs. The centre tab is a floating black circular "+" button raised above the bar.

| Position | Icon | Label | Destination |
|---|---|---|---|
| 1 (left) | House | Home | Voice-first dashboard |
| 2 | Calendar | Calendar | Today's appointments |
| 3 (centre) | Plus (raised FAB) | — | Quick-add (booking, walk-in, charge) |
| 4 | Users | Clients | CRM / client records |
| 5 (right) | Shopping bag | Shop | Products & orders |

Active tab: icon colour Gold `#C9A84C`, label Bold Black
Inactive tab: icon + label Grey `#BBBBBB`
FAB: Black `#111111` circle, Gold `#C9A84C` plus icon, raised 20px above bar with shadow

### Tier Gating

Not all tabs are available on all plans. Locked features show:
- The screen structure in greyed-out state (not blank)
- A centered lock icon
- Plan name + price: "CRM on Growth plan"
- Single CTA button: "Upgrade to Growth · £29/mo" (black button, gold text)
- No aggressive upsell. No popups. Just clarity.

| Tab | Free | Starter (£8.99) | Growth (£29) | Scale (£59) |
|---|---|---|---|---|
| Home | Yes | Yes | Yes | Yes |
| Calendar | Yes | Yes | Yes | Yes |
| Quick-add | Yes | Yes | Yes | Yes |
| Clients/CRM | Locked | Locked | Yes | Yes |
| Shop | Locked | Locked | Locked | Yes |

---

## SCREEN-BY-SCREEN SPECIFICATION

### Screen 0A: Splash Screen

The very first thing anyone sees. Shown for 1.5-2 seconds while the app loads.

- Full screen Black `#111111` background
- Centre: ReeveOS "R" mark — large (80px), Gold on Black
- Below the mark: "ReeveOS" wordmark — 28px ExtraBold White, letter-spacing 1px
- Below wordmark: "Your business, in your pocket" — 13px Medium `rgba(255,255,255,0.4)`
- Subtle animation: the Gold dot in the "R" mark pulses once (scale 1.0 → 1.3 → 1.0) as the app loads
- No loading bar, no spinner. Just the brand, confident and still.
- After load: if returning user with biometrics enabled → go to Screen 0D. If first-time → go to Screen 0B.

---

### Screen 0B: Onboarding (First-Time Only — 4 Slides)

Shown once after install. Swipeable carousel. Skip button top-right on every slide.

**Slide 1: "Your day at a glance"**
- Illustration area (top 50%): mockup of the Home dashboard with stats and next appointment card
- Below: Title — "Your day at a glance" — 22px ExtraBold Black
- Body — "See bookings, revenue, and your next client the moment you open the app. No digging through menus." — 14px Medium Grey
- Bottom: progress dots (4 dots, first active Gold, rest Grey `#E5E7EB`)

**Slide 2: "Talk to your business"**
- Illustration area: mockup of the AI chat with a question and answer visible
- Title: "Talk to your business"
- Body: "Ask anything — 'How many no-shows this month?' 'Send a reminder to Sarah.' ReeveOS answers instantly."

**Slide 3: "Get paid anywhere"**
- Illustration area: mockup of the Stripe Tap to Pay screen with contactless symbol
- Title: "Get paid anywhere"
- Body: "Take card payments on your iPhone. No terminal needed. Funds hit your bank instantly."

**Slide 4: "Built for your business"**
- Illustration area: service colour swatches, calendar preview, client profile card
- Title: "Built for your business"
- Body: "Bookings, clients, consultation forms, loyalty points — everything in one place. GDPR compliant. Your data stays yours."
- Bottom: "Get Started" button — full width, Black background, Gold text, 14px Bold. Replaces the "Next" indicator on final slide.

**Design notes:**
- Each slide transitions with a horizontal swipe + crossfade on the illustration
- Progress dots update with each swipe
- "Skip" button: 13px SemiBold Grey, top-right, tapping goes straight to Screen 0C
- Background: White `#FFFFFF`

---

### Screen 0C: Login / Register

Shown after onboarding (first-time) or if biometrics fail / aren't set up.

**Two modes** — toggle between "Sign in" and "Create account" via tabs at top.

**Sign In mode:**
- Header: "R" mark (centred, 48px) + "Welcome back" — 22px ExtraBold Black
- Subline: "Sign in to your ReeveOS account" — 13px Grey
- Email input field (standard input styling: border-border, rounded-lg, Figtree)
- Password input field (with show/hide eye icon toggle)
- "Forgot password?" link — 12px SemiBold Gold, right-aligned
- "Sign in" button — full width, Black bg, Gold text, 14px Bold
- Divider: "or" line
- "Sign in with Apple" button — full width, white bg, black border, Apple logo + "Continue with Apple" — following Apple's HIG for Sign in with Apple buttons
- "Sign in with Google" button — same pattern, Google "G" logo
- Bottom: "Don't have an account? Create one free" — 13px, "Create one free" in Gold Bold

**Create Account mode:**
- Header: "R" mark + "Create your account" — 22px ExtraBold Black
- Subline: "Free to start. No card required." — 13px Grey
- Full name input
- Email input
- Password input (with strength indicator: bar below that fills Red → Amber → Green)
- "Create account" button — full width, Black bg, Gold text
- Apple / Google sign-up options (same as sign-in)
- Bottom: "Already have an account? Sign in" — 13px, "Sign in" in Gold Bold
- Below button: "By creating an account you agree to our Terms of Service and Privacy Policy" — 10px Grey, links in Gold

**Forgot Password screen (sub-screen):**
- "R" mark + "Reset password" title
- Email input
- "Send reset link" button — Black/Gold
- "Back to sign in" link
- Success state: checkmark + "Check your email — we've sent a reset link"

---

### Screen 0D: Biometric Setup / Unlock

**First-time (after login):**
- Centre: Face ID or Touch ID icon (large, 64px, monochrome Black)
- Title: "Enable Face ID" (or "Enable Touch ID" depending on device) — 20px ExtraBold Black
- Body: "Sign in instantly every time you open the app. Your data stays encrypted on this device." — 13px Grey, centred
- "Enable Face ID" button — full width, Black/Gold
- "Not now" link below — 13px Grey. If skipped, they'll get a PIN setup prompt instead.

**Returning user unlock:**
- Full screen Black background
- Centre: "R" mark (Gold, 64px)
- Below: Face ID / Touch ID icon with subtle pulse animation — system biometric prompt triggers automatically
- If biometric fails: slide transition to PIN entry screen
- PIN entry: 4-digit PIN, large circular number pad, Black buttons with White numbers, Gold dot indicators as digits are entered
- After 3 failed PIN attempts: falls back to full email/password login (Screen 0C)

---

### Screen 0E: Business Selection (Multi-Business Users)

Shown after login if the user has access to more than one business (e.g., salon owner who also has a clinic, or an operator working at two salons).

- Header: "Choose a business" — 22px ExtraBold Black
- Subline: "You have access to {N} businesses" — 13px Grey
- List of business cards, each showing:
  - Business avatar/logo (48px circle)
  - Business name (14px Bold Black)
  - Your role: "Owner" / "Operator" / "Staff" (11px Grey badge)
  - Plan badge: "Scale" / "Growth" etc (tiny pill, Gold bg, Black text)
  - Chevron-right
- Tapping a business loads that business context and goes to Home (Screen 1)
- Bottom: "Add a new business" link — 13px Gold

---


### Screen 1: Home — Voice-First Dashboard

**This is the most important screen in the app.** It's what the user sees after biometric unlock. Straight to content — no loading screens, no "what's new" popups.

**Header** (Black `#111111` background)
- Top-left: "R" mark (32px)
- Greeting: "{Good morning/afternoon/evening}" — 22px ExtraBold White
- Subline: User's first name — 13px Gold `#C9A84C`
- Top-right: Notification bell (White, with red dot if unread) + avatar circle (36px, Gold background, initials in Black)

**Stats Row** (Still within the black header zone, 3 cards)
- 3 equal cards, slightly transparent white background (`rgba(255,255,255,0.06)`)
- Each card: Large number (20px ExtraBold White), small label below (10px `rgba(255,255,255,0.4)`)
- Card 1: "8" / "bookings today"
- Card 2: "£485" / "confirmed revenue"
- Card 3: "0" / "no-shows this week"

**Next Appointment Card** (White card, below header)
- Section label: "NEXT APPOINTMENT" — 11px Bold Grey uppercase tracking
- Card: White, border, subtle shadow
- Left: Colour-coded avatar circle (service colour background at 20% opacity, initials in service colour)
- Centre: Client name (14px Bold Black), Service + duration (12px Grey)
- Right: Time (16px ExtraBold Black), "IN 49 MIN" badge below (10px Bold Gold, gold-tinted background)
- Tapping this card navigates to the Calendar with that appointment expanded

**Quick Actions** (2 buttons, side by side)
- "Share booking link" — white card, border, share icon + text
- "Walk-in" — white card, border, plus icon + text
- Both: 12px Bold Black, centre-aligned, 10px vertical padding

**Today's Schedule** (Scrollable list)
- Section label: "TODAY'S SCHEDULE" — same uppercase treatment
- Each row: colour bar (3px wide, left edge, service colour) | Time (13px Bold) | Avatar circle | Name + service + duration | Status badge
- Completed appointments: all elements in Grey `#9CA3AF`, colour bar grey
- Current/next appointment: "NEXT" badge in Gold on gold-tinted background
- Future appointments: normal Black text, coloured service bar
- Rows separated by 1px border-bottom `#EBEBEB`
- Entire list scrolls vertically under the fixed header

**AI Bar** (Floating, bottom of screen, above tab bar)
- Resting state: Black `#111111` rounded pill (14px radius), full width minus 32px margin
- Left: Gold sparkle/star icon in a subtle gold-tinted circle
- Centre: "Ask ReeveOS anything…" — 13px `rgba(255,255,255,0.5)` placeholder
- Right: Gold microphone icon
- Shadow: `0 8px 24px rgba(17,17,17,0.3)`
- Tapping opens the AI Chat sheet (see Screen 6)

**Designer note:** The AI bar must feel like texting a friend, not opening a settings menu. It should be the most inviting element on the screen. The gold sparkle icon should have a subtle pulse animation when idle.

---

### Screen 2: Calendar — Vertical Timeline

**Header** (White background)
- Title: "Calendar" — 18px ExtraBold Black
- Subtitle: "Tuesday 10 March" — 12px Grey
- Week strip: 7 day columns, horizontal
  - Day abbreviation: 10px SemiBold Grey (or Gold if today)
  - Date number: 13px Bold Black in a circle. Today's date: Black circle, White number
  - Tapping a day loads that day's bookings. Swipe left/right to scroll weeks.

**Timeline** (Scrollable)
- Each appointment is a card with:
  - Left time column: 54px wide, time in 13px Bold Black (or Grey if completed)
  - Card: White background, 1px border, top colour bar (3px height, service colour)
  - Inside card: Client name (13px Bold), Service + duration (11px Grey)
  - Status badges: "DONE" (grey bg, grey text), "NEXT" (gold-tinted bg, gold text), "NO-SHOW" (red-tinted bg, red text)
- Tapping a card expands it inline (not a new screen):
  - Client phone + email
  - "Reschedule" button (white, bordered)
  - Primary action button (black, gold text): "Check In" / "Start" / "Complete" depending on status
- Long-press a card: haptic feedback, drag to reschedule (future)
- Pull-down to refresh

**Empty state:** If no bookings, show centred illustration area with "No appointments today" and a "Share your booking link" CTA.

**Floating "+ New Booking" button** — positioned bottom-right, above tab bar. Black circle, gold plus. 56px diameter.

---

### Screen 3: Quick-Add (Centre FAB)

Tapping the centre + button in the tab bar opens a **bottom sheet** (not a new screen).

- Sheet slides up from bottom, rounded top corners (20px radius)
- Background blur on content behind
- 3 large option cards, stacked vertically:

| Option | Icon | Label | Description |
|---|---|---|---|
| New Booking | Calendar icon | "New Booking" | "Schedule a client appointment" |
| Walk-in | User-plus icon | "Walk-in" | "Add a walk-in client right now" |
| Charge | Pound/currency icon | "Take Payment" | "Charge via Stripe Tap to Pay" |

- Each card: White, bordered, 60px height, icon left (in black circle with gold icon), text right
- Tapping "Take Payment" goes to the Stripe Tap to Pay flow (Screen 7)
- Tapping "New Booking" goes to a booking form
- Tapping "Walk-in" creates an instant booking at current time

---

### Screen 4: Clients / CRM

**Locked state (Free/Starter):**
- Greyed-out list preview showing blurred client rows
- Centre: Lock icon (56px, in grey circle), "CRM on Growth plan", description text, upgrade button

**Unlocked state (Growth+):**
- Search bar at top (same style as web dashboard)
- Client list: Avatar (initials, colour), Name (Bold), Last visit date (Grey), Spend total (Grey)
- Tapping a client opens their profile:
  - Header: Avatar, Name, Phone, Email
  - Tabs: "Appointments" | "Forms" | "Photos" | "Notes" | "Loyalty"
  - Appointments tab: upcoming + history list
  - Photos tab: Before/after grid with side-by-side comparison view
  - Loyalty tab: Points balance, tier badge (Bronze/Silver/Gold), redemption options

---

### Screen 5: Shop / Products

**Locked state (Free/Starter/Growth):**
- Same pattern as CRM locked state
- "Shop on Scale plan" — £59/mo upgrade CTA

**Unlocked state (Scale):**
- Product grid (2 columns)
- Each product card: Image, Name, Price, Stock count
- Low stock badge: Red dot + "Low stock" label
- Orders tab: Recent orders list
- Gift vouchers tab: Active vouchers, create new

---

### Screen 6: AI Chat — "Ask ReeveOS"

Opens as a **bottom sheet** covering ~70% of screen when AI bar is tapped.

**Header:**
- Gold sparkle icon + "ReeveOS AI" (14px Bold Black)
- Close button (×) top-right

**Chat area:**
- AI messages: Left-aligned, light warm background (`#F5F3EE`), rounded bubble (14px radius, bottom-left sharp)
- User messages: Right-aligned, black background, white text, rounded bubble (14px radius, bottom-right sharp)
- Typing indicator: 3 pulsing dots in a light bubble
- Messages should feel conversational, not robotic

**Input area:**
- Text input (full width minus send button), 14px, placeholder "Ask anything…"
- Send button: Black square (40px), gold send/arrow icon
- Microphone button: appears when input is empty, gold mic icon

**AI capabilities the designer should visualise:**
- "How many bookings this week?" → responds with text + inline mini chart
- "What's my no-show rate?" → responds with percentage + trend arrow
- "Send reminder to Sarah" → responds with confirmation + "Sent ✓"
- "What's my revenue today?" → responds with £ figure + comparison to yesterday

**Designer note:** The AI should feel like the app's personality. Not a chatbot buried in a menu — it's the first thing you see, the bar at the bottom of home, always one tap away. This is what makes ReeveOS different from every competitor.

---

### Screen 7: Stripe Tap to Pay (Payment)

Accessed via Quick-Add → "Take Payment" or from a booking's "Charge" button.

**Step 1: Amount**
- If from a booking: amount pre-filled from service price
- If manual: large number input (calculator-style, big digits)
- Operator name shown if Mothership mode: "Charging as: Grace"
- "Charge £85.00" primary button (black, gold text, full width)

**Step 2: Tap Card**
- Full-screen takeover (Stripe Terminal SDK handles this UI)
- ReeveOS branding in header
- Contactless symbol animation centre screen
- "Hold card near iPhone" instruction
- This is Stripe's native UI — we brand the wrapper, not the NFC reader itself

**Step 3: Confirmation**
- Green success checkmark (animated)
- Amount charged: "£85.00"
- Split breakdown (Mothership mode): "Grace receives £59.50 · Salon receives £25.50"
- "Send receipt" button (email/SMS toggle)
- "Done" button returns to previous screen

---

### Screen 8: Mothership Dashboard (Salon Owner View)

Only visible to salon owners who have enabled Self-Employed Mode.

**Header:** "Your Salon" — 18px ExtraBold Black

**Stats Row** (Same pattern as Home stats but salon-wide):
- Total revenue this week
- Total bookings this week
- Chair utilisation %

**Operator Leaderboard:**
- Ranked list of operators
- Each row: Rank number, Avatar, Name, Revenue this week, Bookings count
- #1 gets a gold crown icon
- Underperformers (below average): subtle red-tinted row background
- Tap operator → drill into their individual stats

**Revenue Split Summary:**
- "Salon earned £1,269.00 in commission this week"
- Per-operator breakdown: Name, Their cut, Your cut
- Settlement status: "Paid" (green) or "Pending" (amber)

**Operators Section:**
- Grid of operator cards: Avatar, Name, Status (active/paused), Next available slot
- "Invite Operator" button at bottom

---

### Screen 9: Notifications

Accessed via bell icon on Home.

- List of notifications, most recent first
- Each notification: Icon (type-specific), Title (Bold), Description (Grey), Time ago
- Types: New booking, Cancellation, Payment received, Reminder sent, Low stock, AI insight
- Unread: Blue dot indicator
- Swipe-left to dismiss, tap to navigate to relevant screen

---

### Screen 10: Profile

Accessed via tapping the avatar circle on the Home header.

**Header:**
- Back arrow (top-left) returns to Home
- "Profile" — 18px ExtraBold Black

**Profile Card** (top section, centred):
- Avatar: 80px circle. If photo uploaded: photo. If not: Gold background, initials in Black ExtraBold
- "Edit photo" link below avatar — 11px Gold, tapping opens camera/gallery picker
- Name: 18px ExtraBold Black
- Email: 13px Grey
- Phone: 13px Grey
- Plan badge: pill shape, e.g. "Scale Plan" — Gold background, Black text, 10px Bold

**Business Card** (below profile):
- White card, bordered
- Business name: 14px Bold Black
- Business type: "Aesthetics Clinic" — 12px Grey
- Role: "Owner" or "Operator" — 11px badge
- Address (if set): 12px Grey
- "Switch business" link if multi-business user — 12px Gold

**Menu Sections** (list of tappable rows, grouped):

**Account**
- Edit Profile → Screen 10A
- Change Email → inline edit
- Change Password → sub-screen with current + new + confirm fields
- Notification Preferences → Screen 10B

**Business** (Owner only)
- Business Settings → Screen 10C
- Services & Menu → links to web dashboard
- Staff / Operators → Screen 10D
- Booking Page Settings → sub-screen: booking link URL, share button, QR code display, online toggle

**Billing & Plan**
- Current Plan → Screen 10E
- Payment Method → Screen 10F
- Invoices & Receipts → Screen 10G

**Payments**
- Stripe Account → Screen 10H (Stripe Connect status, payout schedule, bank details)
- Payment History → list of received payments with date, amount, client, status

**Security**
- Face ID / Touch ID → toggle (on/off)
- App PIN → set/change 4-digit PIN
- Two-Factor Authentication → setup/manage
- Active Sessions → list with "Sign out all" button

**Legal & Help**
- Help Centre → opens in-app browser to support.reeveos.app
- Contact Support → opens AI chat pre-filled with "I need help with..."
- Privacy Policy → in-app browser
- Terms of Service → in-app browser
- Data Export (GDPR) → "Request my data" button, confirmation, "We'll email you within 48 hours"
- Delete Account → red text, confirmation modal with "Type DELETE to confirm" pattern

**Bottom:**
- "Sign Out" button — full width, white bg, red border, red text
- App version: "ReeveOS v1.0.0 (Build 1)" — 10px Grey, centred

Each row: left icon (monochrome, 18px), label (13px SemiBold Black), chevron-right (Grey). Grouped sections separated by section headers in uppercase 10px Bold Grey with 20px top margin.

---

### Screen 10A: Edit Profile

- Back arrow + "Edit Profile" title
- Avatar with camera overlay icon (tap to change photo)
- Fields (all editable, standard input styling):
  - First Name
  - Last Name
  - Email (read-only, greyed, "Change email" link below)
  - Phone (with UK +44 prefix selector)
  - Bio / About (textarea, 200 char limit) — "Clients see this on your booking page"
  - Specialties (chip selector: e.g. "Microneedling", "RF Needling", "Chemical Peels" — add custom)
- "Save Changes" button — full width, Black/Gold
- "Cancel" link below — 13px Grey

---

### Screen 10B: Notification Preferences

- Back arrow + "Notifications" title
- Grouped toggles:

**Push Notifications**
- New booking received — toggle (default on)
- Booking cancelled — toggle (default on)
- Client checked in — toggle (default on)
- Payment received — toggle (default on)
- Reminder: upcoming appointment — toggle (default on)
- Low stock alert — toggle (default on)
- AI insights — toggle (default on)

**Email Notifications**
- Daily summary — toggle (default on)
- Weekly performance report — toggle (default off)
- Marketing tips from ReeveOS — toggle (default off)

**SMS Notifications**
- New booking (SMS) — toggle (default off)
- Cancellation (SMS) — toggle (default off)

Each toggle: label left (13px SemiBold Black), hint below (11px Grey), toggle right (Black track when on, Grey when off). Rows separated by 1px border.

---

### Screen 10C: Business Settings (Owner Only)

- Back arrow + "Business Settings" title
- Sections:

**Basic Info**
- Business Name (input)
- Business Type (selector: "Hair Salon", "Aesthetics Clinic", "Barbershop", "Spa", "Beauty Salon", "Other")
- Address (input with postcode lookup)
- Phone
- Email
- Website URL

**Opening Hours**
- 7-day grid: each day shows Open/Closed toggle + start time + end time
- "Copy Monday to all" shortcut button
- Bank holidays: "Automatically close on UK bank holidays" toggle

**Booking Settings**
- Slot duration: chip selector (15m, 20m, 30m, 45m, 60m)
- Booking window: "How far ahead can clients book?" — dropdown (1 week, 2 weeks, 1 month, 2 months, 3 months)
- Cancellation policy: chip selector (No policy, 24hr, 48hr, 72hr)
- Booking fee: toggle + amount input
- Minimize gaps: toggle + gap tolerance input

**Self-Employed Mode (Mothership)**
- "Enable Self-Employed Mode" — toggle
- Description: "Allow self-employed operators to have their own portals, calendars, and payment accounts within your business."
- Commission structure: "Percentage" or "Fixed chair rental" selector
- Default rate: input (e.g. 30%)
- Settlement frequency: "Instant (Stripe)" / "Weekly" / "Biweekly" / "Monthly"

**Branding**
- Business logo upload (shown on booking page and client emails)
- Brand colour picker (for booking page accent — not the app itself, which is always Black/Gold)

"Save Changes" button at bottom — Black/Gold

---

### Screen 10D: Staff / Operators (Owner Only)

- Back arrow + "Team" title
- Tab bar: "All" | "Active" | "Paused" | "Left"
- Each team member card:
  - Avatar (48px circle)
  - Name (14px Bold)
  - Role badge: "Owner" / "Operator" / "Staff" (11px pill)
  - Status: Green dot "Active" / Grey "Paused" / Red "Left"
  - Commission rate or chair rental shown: "30% commission" or "£200/week"
  - Chevron-right to edit
- Tap a team member → detail screen:
  - All their profile fields
  - Commission rate (editable by owner)
  - Stripe Connect status: "Connected" (green) or "Not connected" (amber + "Send invite" button)
  - Services they provide (chip selector)
  - Schedule (7-day availability grid)
  - "Pause operator" / "Remove operator" buttons at bottom
- "Invite Operator" floating button at bottom — opens invite flow:
  - Name, Email, Phone inputs
  - Commission rate input
  - Services selector
  - "Send Invite" button — triggers email to operator

---

### Screen 10E: Current Plan & Upgrade

- Back arrow + "Your Plan" title
- Current plan card (top, prominent):
  - Plan name: e.g. "Growth" — 20px ExtraBold Black
  - Price: "£29/month" — 16px Bold Gold
  - Renewal date: "Renews 10 April 2026" — 12px Grey
  - Status: "Active" green badge
  - Features list: checkmark + feature name (e.g. "Up to 5 staff", "CRM", "Consultation forms", "Deposits")

- Plan comparison (below):
  - Horizontal scrollable cards for all plans: Free, Starter (£8.99), Growth (£29), Scale (£59), Enterprise (£149)
  - Each card: Plan name, price, key features (3-4 bullet points), "Current plan" badge or "Upgrade" button
  - Current plan highlighted with Gold border
  - Upgrade buttons: Black/Gold
  - Downgrade: "Contact support to change plan" link at bottom (no self-serve downgrade to prevent accidental data loss)

---

### Screen 10F: Payment Method

- Back arrow + "Payment Method" title
- Current card on file:
  - Card icon (Visa/Mastercard/Amex monochrome logo)
  - Card ending: "•••• 4242" — 14px Bold Black
  - Expiry: "09/27" — 12px Grey
  - "Default" badge (green pill)
- "Update card" button — opens Stripe-hosted card update form (in-app browser, secure)
- "Add new card" button — same Stripe-hosted form
- Billing email: shown + editable

**Important note for designer:** We NEVER show full card numbers, CVVs, or collect card details in our own UI. Always Stripe-hosted. Show the card icon + last 4 digits only.

---

### Screen 10G: Invoices & Receipts

- Back arrow + "Invoices" title
- Filter: Month/year selector (e.g. "March 2026", arrows to navigate months)
- List of invoices:
  - Each row: Date (13px Bold), Description ("Growth Plan — Monthly"), Amount ("£29.00"), Status pill ("Paid" green / "Failed" red / "Pending" amber)
  - Tap row → invoice detail:
    - Full breakdown: plan, period, amount, tax (if applicable), total
    - "Download PDF" button
    - "Email receipt" button
    - Payment method used: card last 4
    - Stripe invoice ID (small, grey, for support reference)

---

### Screen 10H: Stripe Account (Payments Settings)

- Back arrow + "Payments" title

**If Stripe not connected:**
- Illustration: monochrome payments icon
- Title: "Connect your Stripe account" — 18px ExtraBold Black
- Body: "Accept card payments, Tap to Pay, and online booking fees. Takes 5 minutes." — 13px Grey
- "Connect Stripe" button — full width, Black/Gold
- Tapping opens Stripe Express onboarding (in-app browser)
- "Why Stripe?" expandable: "Stripe handles all card processing securely. We never see your card data or your clients' card data. Funds go directly to your bank account."

**If Stripe connected:**
- Status: "Connected" green badge + connected since date
- Bank account: "Barclays •••• 1234" (masked)
- Payout schedule: "Daily" / "Weekly" / "Monthly" — selector
- Next payout: "£347.20 on 11 March" — 14px Bold
- "View in Stripe Dashboard" link — opens Stripe dashboard in browser

**For Mothership operators:**
- Same Stripe setup flow but framed as: "Connect your account to receive your earnings"
- Shows: "Your commission split: 70% to you, 30% to salon"
- Recent earnings: last 5 payments with amount, date, salon cut, your cut

---

### Screen 11: Booking Link & Share

Accessed from Quick Actions on Home or from Business Settings.

- Header: "Your Booking Link" — 18px ExtraBold Black
- Booking URL displayed prominently: "portal.rezvo.app/book/rejuvenate" — 14px Bold, in a bordered card with copy icon
- "Copy Link" button — full width, Black/Gold
- QR Code: large (200px), generated from booking URL, Black on White, "R" mark centred in the QR
- "Save QR to Photos" button — secondary style (white, bordered)
- Share options row (4 icons):
  - SMS (message icon)
  - WhatsApp (message icon)
  - Email (mail icon)
  - More (share icon → system share sheet)
- Each icon: 44px tap target, Black circle, Gold icon inside

**For Mothership operators:** Shows their personal booking link instead:
"portal.rezvo.app/book/rejuvenate/grace"

---

### Screen 12: Consultation Forms

Accessed from Client profile "Forms" tab or from the main menu.

**Form list view:**
- "Consultation Forms" — 18px ExtraBold Black
- Tab bar: "Templates" | "Submitted" | "Pending"
- Templates tab: list of installed form templates (from our 35+ template library)
  - Each row: form name, category badge, contraindication count
  - "Browse Template Library" button at bottom — opens library with search/category filter
- Submitted tab: completed forms, most recent first
  - Each row: client name, form name, date completed, status (valid/expired)
  - Green tick if within validity period, amber warning if expiring soon, red X if expired
- Pending tab: forms sent but not yet completed by client
  - Each row: client name, form name, date sent, "Resend" button

**Form detail view** (tapping a submitted form):
- Client name + date at top
- Sections displayed in order: personal info, medical history, allergies, etc.
- Contraindication flags highlighted: BLOCK (red banner), FLAG (amber banner), OK (no banner)
- "Send Aftercare" button if aftercare template is linked
- "PDF Export" button
- "Void Form" button (marks as no longer valid)

---


## INTERACTION PATTERNS

### Gestures

| Gesture | Action |
|---|---|
| Swipe left on calendar | Next day |
| Swipe right on calendar | Previous day |
| Tap appointment card | Expand inline detail |
| Long-press appointment | Drag to reschedule (future) |
| Pull down | Refresh data |
| Swipe left on notification | Dismiss |
| Tap AI bar | Open AI chat sheet |
| Tap + FAB | Open quick-add sheet |

### Transitions

- Screen-to-screen: Horizontal slide (push left/right)
- Bottom sheets: Slide up with spring animation (slight overshoot)
- Cards expanding: Height animation with content fade-in
- Tab switching: Crossfade (no slide)
- Loading states: Skeleton screens (grey pulsing rectangles matching content layout), never spinners

### Haptics

- Tap buttons: Light impact
- Long-press: Medium impact
- Success (payment complete): Success notification haptic
- Error: Error notification haptic

---

## WHAT TO DELIVER

### Figma Deliverables

1. **Component Library** (first)
   - Colour styles matching the palette above
   - Text styles for every typography level
   - Icon set (monochrome line icons, consistent stroke weight)
   - Button components: Primary (black/gold), Secondary (white/bordered), Destructive (red)
   - Input components: Text, Number, Search, Textarea
   - Card components: Appointment card, Client card, Stat card, Product card
   - Badge components: Status badges, Tier badges, Count badges
   - Tab bar component with active/inactive states
   - Toggle component
   - Bottom sheet component

2. **Wireframes** — every screen listed above, iPhone 14/15 Pro frame (393 x 852px)
   - 0A: Splash screen
   - 0B: Onboarding (4 slides — show all 4 as separate frames)
   - 0C: Login (Sign In mode + Create Account mode + Forgot Password — 3 frames)
   - 0D: Biometric setup (first-time) + Biometric unlock (returning) + PIN fallback — 3 frames
   - 0E: Business selection (multi-business)
   - 1: Home (with stats populated, AI bar visible)
   - 2: Calendar (6+ appointments, various statuses)
   - 2b: Calendar with one appointment expanded
   - 3: Quick-add bottom sheet (3 options visible)
   - 4: Client list (unlocked state)
   - 4b: Client list (locked/upgrade state)
   - 4c: Client profile with tabs (Appointments, Forms, Photos, Notes, Loyalty)
   - 5: Shop (locked state)
   - 5b: Shop (unlocked state with products)
   - 6: AI chat (3+ messages, different response types)
   - 7a: Stripe Tap to Pay — amount entry
   - 7b: Stripe Tap to Pay — contactless prompt
   - 7c: Stripe Tap to Pay — confirmation + split breakdown
   - 8: Mothership dashboard (salon owner view)
   - 9: Notifications list
   - 10: Profile / Settings main menu
   - 10A: Edit Profile
   - 10B: Notification Preferences
   - 10C: Business Settings (with Self-Employed Mode section)
   - 10D: Staff / Operators list + invite flow
   - 10E: Current Plan + upgrade comparison
   - 10F: Payment Method (card on file)
   - 10G: Invoices list + invoice detail
   - 10H: Stripe Account (connected state + not-connected state — 2 frames)
   - 11: Booking Link & Share (with QR code)
   - 12: Consultation Forms (template list + submitted form detail — 2 frames)

3. **User Flows** (arrows connecting screens)
   - Flow 1: First-time — Splash → Onboarding (4 slides) → Create Account → Biometric Setup → Home
   - Flow 2: Returning user — Splash → Biometric Unlock → Home
   - Flow 3: Home → tap AI bar → ask question → see answer → close
   - Flow 4: Home → tap next appointment → expand → tap "Check In" → status updates
   - Flow 5: Tap + FAB → "Take Payment" → enter amount → tap card → confirmation → receipt sent
   - Flow 6: Home → Calendar → swipe to tomorrow → tap appointment → reschedule
   - Flow 7: Mothership owner → dashboard → tap operator → see their performance → back
   - Flow 8: Profile → Billing → Current Plan → Upgrade → Payment → Confirmation
   - Flow 9: Profile → Stripe Account → Connect Stripe → Onboarding complete → Back to Profile
   - Flow 10: Home → Share booking link → QR code → Save to photos / Send via WhatsApp

4. **Prototype** (clickable)
   - Connect all screens with transitions
   - Bottom sheet interactions working
   - Tab bar navigation working
   - AI chat scrollable with messages

---

## WHAT NOT TO DO

- **No teal.** No green accents. No blue accents. Black + Gold + White only.
- **No emojis anywhere.** Not in the UI, not in placeholder text, not in AI responses.
- **No default iOS/Material Design components.** Everything custom-styled to our brand.
- **No tiny tap targets.** Minimum 44x44px. These people have wet hands, acrylic nails, and flour on their fingers.
- **No login screen in the MAIN daily flow.** Returning users get biometric straight to Home. The login/register screens (0C) are for first-time setup and biometric failure fallback only.
- **No placeholder text like "Lorem ipsum."** Use real data: real service names (Microneedling, RF Needling, Chemical Peel), real UK names, real prices in £, real times.
- **No hamburger menus.** Everything accessible via the 5-tab bar or contextual actions.
- **No full-screen modals for simple actions.** Use bottom sheets and inline expansion.
- **No colour in icons.** Monochrome only. Gold on dark, Black on light.

---

## COMPETITOR REFERENCE

Study these apps before designing. Take what works, make it better in our brand:

**Fresha** — Best-in-class calendar. Swipe-to-day is smooth. Category colour coding on appointment cards. But: their UI is generic white/blue, no personality. We beat them on brand and AI.

**Booksy** — Strong mobile-first design. Client profiles are well-structured. But: cluttered with too many icons and badges. We stay cleaner.

**Timely** — Beautiful desktop UI but their mobile app is essentially a web wrapper. Reviews complain about freezing and blank screens. We must be native-feeling.

**Square POS** — Best hardware integration UX. Tap to Pay flow is clean and fast. Study their payment confirmation screen. But: no AI, no salon-specific features.

**Stripe Dashboard App** — Their Tap to Pay integration is the gold standard for mobile payments. Study how they handle the NFC prompt screen. We wrap this with our brand.

---

## FINAL NOTE TO THE DESIGNER

This app is going to be shown to salon owners, clinic practitioners, and self-employed operators this month. It needs to look like it costs £50k to build. It needs to feel like the designer understood what it's like to run a small business — the chaos, the juggling, the "I just need to check one thing quickly" moments.

The AI bar at the bottom of the home screen is the soul of this app. It's what makes us different. It should feel alive — not tucked away, not an afterthought. When someone picks up their phone and sees that gold sparkle icon with "Ask ReeveOS anything…", they should feel like they've got a business partner in their pocket.

Make it premium. Make it fast. Make it sell itself.

**Brand: Black #111111 · Gold #C9A84C · White #FFFFFF · Figtree · Monochrome icons only.**