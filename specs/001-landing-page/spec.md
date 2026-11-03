# Feature Specification: BlueFrost Aircon Landing Page

**Feature Branch**: `001-landing-page`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "A clean, professional static landing page for a made-up aircon cleaning and repair company in Cavite, Philippines (BlueFrost Aircon). USAD Labs portfolio piece. Fake data only. Services pattern: problem-first headline, real-person hero with a 'Get a quote' button, client logo row, service cards with icons, pricing packages, reviews with stars, FAQ, final call-to-action band. Alternating light and dark sections, trust icons under the hero, stats row, how-it-works steps. Mobile first, fast, accessible. Stage 1 = static page only; the instant quote calculator is stage 2."

## Clarifications

### Session 2026-11-03

- Q: What language should the page copy use? → A: English only.
- Q: How should pricing be structured? → A: 3 packages (Basic Clean, Deep Chemical Clean as most popular, Care Plan), each "from ₱X per unit", plus a short note on how the price changes by unit type (window vs split).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homeowner with a weak aircon asks for a quote (Priority: P1)

A homeowner in Cavite whose aircon is weak, noisy or leaking opens the page on their phone, sees right away that BlueFrost fixes exactly that problem, and taps one button to call or message for a quote.

**Why this priority**: Turning a visitor into a call or message is the whole point of the page. Without it, the page is a brochure.

**Independent Test**: Open the page on a 360px-wide phone screen, find the quote action without scrolling, and confirm that it opens a phone call or a message.

**Acceptance Scenarios**:

1. **Given** a visitor on a 360px-wide phone, **When** the page loads, **Then** the problem-first headline and a "Get a quote" action are both visible without scrolling.
2. **Given** a visitor anywhere on the page, **When** they look for a way to get a quote, **Then** a quote action is reachable within one tap (a sticky bar on phones, and repeated in the hero, pricing and final call-to-action band).
3. **Given** a visitor taps "Get a quote" or "Call", **When** the action runs, **Then** it opens the phone dialer with the sample number. The "Message us" action opens the sample Messenger link in a new tab.
4. **Given** a visitor with JavaScript turned off, **When** they use the page, **Then** every section and every quote action still works.

---

### User Story 2 - Visitor checks whether BlueFrost can be trusted and what it costs (Priority: P2)

Before contacting anyone, a cautious visitor scans the trust signals (trust icons, client logos, stats, reviews), the list of services, and the package prices, so they know BlueFrost is legitimate and roughly what they will pay.

**Why this priority**: Price and trust are the main reasons local service visitors don't call. Showing them removes the hesitation.

**Independent Test**: Scroll the page and confirm that services, prices in pesos, star ratings and FAQ answers are all readable without contacting anyone.

**Acceptance Scenarios**:

1. **Given** a visitor scrolling, **When** they reach the services section, **Then** they see 4 service cards (cleaning, repair, installation, freon/gas refill), each with an icon, a one-line benefit and a short detail.
2. **Given** a visitor at pricing, **When** they compare packages, **Then** they see 3 packages with a peso price ("from ₱…"), what is included, and one package marked as the most popular.
3. **Given** a visitor at reviews, **When** they read them, **Then** each review shows a star rating, a first name with an initial, a Cavite town, and an initials avatar (no stock faces).
4. **Given** a visitor with a question, **When** they open an FAQ item, **Then** the answer expands and collapses with a keyboard or a tap, and with JavaScript off.

---

### User Story 3 - A USAD Labs prospect judges the page as a portfolio piece (Priority: P3)

A business owner whom USAD Labs is pitching opens the live page to judge the quality: it loads fast, looks professional on phone and desktop, and is obviously a demo with sample data.

**Why this priority**: This is the business reason the page exists, but it depends on stories 1 and 2 being good.

**Independent Test**: Open the live link on a phone and a desktop, run an automated quality audit, and read the footer.

**Acceptance Scenarios**:

1. **Given** the live page, **When** it is audited on a simulated mid-range phone, **Then** it meets the thresholds in Success Criteria SC-002 to SC-005.
2. **Given** any visitor, **When** they reach the footer, **Then** they see a clear note that BlueFrost Aircon is a fictional business and all data is sample data, plus a "Built by USAD Labs" credit.

---

### Edge Cases

- A visitor on a very narrow screen (320px): nothing scrolls sideways, and text and buttons stay readable and tappable.
- A visitor who prefers reduced motion: any animation is turned off, and every element is visible without it.
- Images that fail to load or load slowly: the text still makes sense; every meaningful image has alternative text; layout does not jump while they load.
- A visitor using only a keyboard or a screen reader: every action is reachable in logical order with a visible focus indicator; a "skip to content" link exists.
- A desktop visitor taps the call link: their device handles a `tel:` link however it normally does (the number is also shown as text so they can dial by hand).
- The Messenger link is a placeholder: it must not point to any real person's or real business's account.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST show these 11 sections in this order: (1) hero, (2) trust icon row, (3) client logo row, (4) services, (5) stats row, (6) how it works, (7) pricing packages, (8) reviews, (9) FAQ, (10) final call-to-action band, (11) footer.
- **FR-002**: The hero MUST have a headline about the customer's problem (not about the company), a supporting line, a photo of a person doing aircon work, a primary "Get a quote" action and a secondary "Message us" action.
- **FR-003**: Sections from the services section onward MUST alternate between light and dark backgrounds so the page is easy to scan.
- **FR-004**: The trust icon row MUST show 3 to 4 short claims with icons (for example: trained technicians, same-day service in Cavite, 90-day service warranty, transparent pricing).
- **FR-005**: The client logo row MUST show 4 to 6 invented client wordmarks, never real brands.
- **FR-006**: The stats row MUST show 3 to 4 sample numbers (for example: units serviced, years in service, average rating, towns covered).
- **FR-007**: The how-it-works section MUST show 3 numbered steps from booking to a cold room.
- **FR-008**: The pricing section MUST show 3 packages: Basic Clean, Deep Chemical Clean (highlighted as the most popular) and Care Plan. Each has a peso price written "from ₱X,XXX per unit", a list of what is included and a quote action. Below the cards, one short note MUST explain how the price differs by unit type (window vs split).
- **FR-009**: The reviews section MUST show 3 sample reviews with a 1–5 star rating that is readable by screen readers, not shown only as a picture.
- **FR-010**: The FAQ MUST have 5 to 6 questions (for example: how often to clean, how long a visit takes, areas served, warranty, payment methods, whether there is a fee if nothing is fixed) that work without JavaScript.
- **FR-011**: Quote actions MUST be a call link to a sample mobile number in the 09XX format and a link to a placeholder Messenger page. The page MUST NOT contain any form or collect any visitor data.
- **FR-012**: On phones, a quote action MUST stay reachable while scrolling (a sticky bar) without covering content.
- **FR-013**: The footer MUST show sample contact details (number, service area in Cavite towns, hours), the fictional-business notice and the USAD Labs credit.
- **FR-014**: All business names, people, numbers, reviews and prices MUST be invented. No real people, companies, logos or trademarks appear anywhere, including in photos.
- **FR-015**: Every photo MUST be either free stock whose licence allows commercial use, or AI-generated for this demo with a model whose licence allows commercial use (FLUX.2 [klein] 4B, Apache-2.0). People in AI photos are fictional, and the page says so in the footer. Sources and licences are recorded in CREDITS.md.
- **FR-016**: The page MUST include a title, a meta description, a social share preview (title, description and image) and a favicon.
- **FR-017**: All content MUST work and be readable with JavaScript turned off.
- **FR-018**: The services section MUST show exactly 4 service cards (cleaning, repair, installation, freon/gas refill), each with an icon, a one-line benefit and a short detail.

### Key Entities

- **Service**: name, icon, one-line benefit, short detail.
- **Package**: name, "from" price in pesos per unit, included items, a most-popular flag, and the price difference for each unit type (window, split), which the stage 2 calculator will reuse.
- **Review**: reviewer first name and initial, Cavite town, star rating (1–5), quote text.
- **FAQ item**: question, answer.
- **Business info**: name, sample phone, sample Messenger link, service area, hours, stats.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a 360px-wide phone, a visitor can find and use a quote action in under 5 seconds and in 1 tap, without scrolling.
- **SC-002**: The page scores at least 90 for performance, 95 for accessibility, 90 for best practices and 90 for SEO in a standard automated audit on a simulated mid-range phone.
- **SC-003**: An automated accessibility scan finds 0 serious or critical issues, and every text/background pair meets WCAG 2.2 AA contrast.
- **SC-004**: Nothing scrolls sideways at widths of 320px, 360px, 768px and 1280px.
- **SC-005**: The first page load transfers under 500 KB in total.
- **SC-006**: With JavaScript turned off, all 11 sections and all quote actions remain present and usable.
- **SC-007**: A secret scan of the project and its history finds 0 secrets, and a manual check finds 0 real names, brands or contact details.

## Assumptions

- Language is English only (no Taglish), with prices in Philippine pesos (₱).
- Service area: sample towns in Cavite (for example: Dasmariñas, Imus, Bacoor, Silang, Tagaytay, General Trias).
- The sample phone number is clearly fake and will not ring anyone. The Messenger link points to a neutral placeholder, not a real account.
- One page only. No booking, no form, no backend and no analytics in stage 1.
- The instant quote calculator (stage 2) is out of scope, but the pricing data should be easy to reuse for it later.
- Visitors are mostly on mid-range Android phones over mobile data, so speed matters more than visual effects.
- Hosted on a free static host. Deploying is a separate, approved step.
