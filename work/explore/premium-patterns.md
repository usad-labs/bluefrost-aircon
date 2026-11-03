# Premium vs generic: service landing pages (BlueFrost Aircon)

Scout: Nori. Date: 2026-11-03. Recommend only; nothing installed or changed.

**Honest limits of this research.** Search showed Dribbble and roundup pages only as titles and snippets. I could not open the images. So the patterns below are a mix of (a) what the sources say, (b) the Antixor notes in `Landing Page References.md`, and (c) a read of our own screenshot (`docs/screenshot-1280-full.png`). Marked "(inferred)" where I am not quoting a source. Nothing here is a conversion claim.

## Diagnosis in one line

Our page has one photo (`src/assets/hero-technician.jpg`) in about 6,000px of page. The rest is text, numbers and icons on flat colour. "Generic" is mostly **no photography and no overlap or depth**, not the type or colour.

## 1. The 10 patterns

Cost = extra weight against our 99/100 Lighthouse. Assumes Astro `<Image>`, AVIF/WebP, explicit width/height, `loading="lazy"` on everything except the hero.

| # | Pattern | What it is | Why it works | Speed cost |
|---|---|---|---|---|
| 1 | **Floating stat card on the hero photo** | A small solid card overlapping the photo's bottom-left edge: "4.9 / 5 · 2,400+ units" or "Next free slot: today 3 pm". A second small chip on the opposite corner. | Proof sits inside the first look. The overlap makes the photo feel like a layer, not a box. | 0 KB. CSS only. |
| 2 | **Layered hero frame** | Photo in a rounded crop that bleeds off one edge, with an offset cyan block or ring behind it. Replaces the flat wave divider. | Cheap depth. Reads as designed, not templated. | 0 KB. CSS or one inline SVG. |
| 3 | **Photo service cards with price** | Four cards: photo on top (same crop ratio), title, one line, a "from ₱500" pill overlapping the photo's bottom edge, action link. Replaces the numbered list rows. | This is the Antixor "photo cards with price" pattern. People buy a service they can picture. | 4 photos, about 15-25 KB each at 480w AVIF, lazy. |
| 4 | **Real-looking AC unit shots** | Clean cut-out split-type and window unit on a plain or icy background, used in the pricing cards and the "which unit do you have" note. | Shows the product being serviced; a competitor with the same words can't copy a unit photo. | 2-3 images, about 10-20 KB each (transparent WebP/AVIF). |
| 5 | **Technician card** | Portrait with name, years, a rating, one "certified" chip, a 1-line quote. Three in a row, or one featured next to How it works. | Puts a person's face on the promise. Local trades sites lean on this (Rene's, The Furnace Guy, Artic Breeze, First Opinion all lead with a technician or team photo per the Ueni roundup). | 1-3 photos, about 12 KB each at 400w. Hero technician can be reused for one. |
| 6 | **Before / after pair** | Two photos side by side, labelled Before and After: dirty coil vs clean coil, or a dripping vs dry unit. Static, no slider. | Shows the result, not the claim. Colorlib's cleaning roundup lists before/after as standard on top performers. | 2 photos (one pair), about 20 KB each. Slider would need JS: don't. |
| 7 | **Video "story" block** | A big photo with a play button and a 1-line caption ("See a Deep Clean in 90 seconds"). Dark section, text left, thumbnail right. | Antixor has this block. It adds a dark, photo-led section that breaks the text rhythm. | 1 photo. Make it a plain link to a hosted video or a labelled "sample" poster. No iframe, so 0 JS and no third-party weight. |
| 8 | **Review cards with faces** | Round 64-96px portrait, name, town, stars, 1-2 lines. One featured big card plus two small is fine. | Faces are the cue that these are people. Ours are initials in circles. | 3 portraits, about 3-6 KB each at 96px. |
| 9 | **Service-area map** | A simple drawn map of Cavite with pins and labels for the six covered towns, next to a short "we come to you" line. Replaces the plain town list in the footer. | The page sells local. A map proves it in one look. | 0 photos. Hand-made inline SVG, about 3-8 KB. No map library. |
| 10 | **Photo CTA band + alternating dark/light** | Final call-to-action over a full-width photo with a navy overlay, instead of the flat cyan block. Keep light and dark sections taking turns. | Antixor ends this way. A page that ends on a photo feels finished. | 1 photo, about 30-40 KB at 1280w, lazy. |

**Total new photography: about 14 images** (4 service, 2-3 unit, 1-3 technician, 2 before/after, 1 video poster, 3 faces, 1 CTA). At the sizes above that is roughly 250-350 KB, all lazy. Only the hero is eager and preloaded. I expect Lighthouse to stay in the high 90s if width/height are set and nothing but the hero is eager (inferred, test it).

## 2. Best references (copy patterns only, never the designs)

1. **Ueni, 30 best HVAC websites** - https://ueni.com/blog/hvac-websites/ - Read in full. Copy: technician or team photo in the hero, branded van photo, emergency or "Book now" CTA, a top promo bar, a floating contact card (Annointed Services). Weak on map and video, so don't look there for those. It is a vendor roundup.
2. **Dribbble: HVAC shots and collections** - https://dribbble.com/YSRstudio/collections/7543247-Service-Businesses and https://dribbble.com/services/search/home-service - Found by search, **not opened**. Copy: hero with overlapping chips and service cards. Look for the "CoolFix" repair-service shot (278 likes per the snippet).
3. **Framer "Airwell" HVAC template page** - https://www.framer.com/marketplace/templates/75579/ - Snippet only, **not opened**. Use the preview to see how a paid template layers photo, cards and badges. Patterns only.
4. **Ueni, 25 cleaning service websites** - https://ueni.com/blog/cleaning-service-website/ - Snippet only, **not opened**. Copy: before/after pairs and quote button placement. Zarla, Wix and HubSpot cleaning roundups from the same search are alternates.
5. **Our own Antixor notes** - `30 - Resources\References\Landing Page References.md` - the pattern list there is the closest match to what the user asked for. Use it as the checklist.

Not covered: Awwwards and Landingfolio returned nothing relevant in one search. Before the build, the lead should open 2-3 Dribbble shots in a browser and pick one named direction (see Team Lessons 2026-11-03).

## 3. Free image needs and sources

Sources are Pexels, Unsplash, Pixabay. All three allow free commercial use without credit, but their licences exclude identifiable people used to endorse a product in some cases. For a **labelled sample demo** that is fine. Check each photo's page before use. **I did not browse these sites, so availability below comes from general knowledge and is unverified.**

| Pattern | Photos | Realistic? |
|---|---|---|
| Hero (have it) | 1, done | Yes. |
| Service cards | 4 (cleaning a split unit, technician checking a unit, installing on a wall, gauges or gas refill) | Good. Pexels and Unsplash have many "air conditioner repair" shots. Gas refill is the thinnest. Fallback: gauge close-up. |
| AC unit shots | 2-3 cut-outs | Fair. Pixabay is the best for plain-background or transparent units. Otherwise a clean white split unit on a wall photo, cropped. |
| Technician cards | 1-3 | Good for "technician in uniform". Hard to match one person across shots. Using three different people is fine. |
| Before / after | 2 (one pair) | Weakest. Dirty coil photos are rare. Fallbacks: a dirty vs clean filter, or a stained vs clean vent. The pair must obviously be the same kind of thing. |
| Video poster | 1 | Good. Any technician-at-work shot. |
| Review faces | 3 | Good in general. Local-looking (Filipino) faces are scarcer on Unsplash and a bit better on Pexels. Tell the lead if the user cares. |
| CTA band | 1 wide, empty-space-left photo | Fair. Needs a wide shot with room for text. A cool living room with a wall unit works. |

**Rule conflict for the lead to decide.** `usad-design` says "never use real people" and also allows labelled sample proof. A stock face next to an invented name is a real person's face on a fake review. Suggest: allowed only with the visible "sample data" note we already have, and never on a page for a real client.

## 4. `usad-design` section 7 and nearby rules that over-correct

The skill's own line "Do not over-correct" is there, but the rules around it push the page flat. Exact wording changes below. Quote is the current text, then the suggested replacement.

1. **Section 3, Media**
   - Now: "one strong image beats six small ones."
   - Change to: "One strong hero image, then a photo for every service, person and proof point. Same crop ratio and treatment across a set. A service page with fewer than ten real photos reads as unfinished."
   - Why: this line is why the page has one photo.

2. **Section 3, Group by proximity**
   - Now: "Add boxes or cards only when spacing cannot do the job."
   - Change to: "Use spacing to group text. Use cards when the item has a photo, a price or an action: those are products, and a photo card with a price is the normal way to sell a service."

3. **Section 4, Depth**
   - Now: "a shadow ... only on things that really float (menus, dialogs). ... Pick one elevation method: border or shadow, not both."
   - Change to: "Depth is allowed where things really overlap: a card over a photo, a badge on a card edge, a photo with an offset frame behind it. Use a short, tinted shadow (navy hue, small blur, small y offset). One elevation method per surface. No grey shadow under cards that sit flat."

4. **Section 7, Surface: "A soft grey shadow under every card"**
   - Keep, add: "Floating stat cards and overlapping badges on photos are not this tell. They are layering."

5. **Section 7, Layout: "The 'big number, small label' stat row, especially with made-up numbers."**
   - Change to: "A full-width row of four big numbers is the tell. One proof card (rating plus count) placed on the hero photo or next to a review is not."
   - Our page has the four-number row and the skill bans it, so one of them has to give.

6. **Section 7, Icons and type: "pill badges ('New', 'Beta') above the headline."**
   - Add: "Functional badges on photos (price, rating, 'Same-day', 'Most popular') are fine: they carry information."

7. **Section 7, Layout: "Everything centred. Left-align by default"**
   - Add: "Left-aligned text needs a visual on the right. If the right half is empty, the page reads flat."
   - Why: left-align plus no photos gives the empty stretches on our screenshot.

8. **Section 7, "Do not over-correct" paragraph**
   - Now: "Fill it with scale, full content, a real image of the subject, or a flat field of colour, not another ornament."
   - Change to: "Fill it with a real photo of the subject first, then scale, then full content. A flat field of colour is last, never the default."
   - Why: "flat field of colour" is the weakest fill and is the page's current look.

9. **Section 4, "One ground, one ink, one accent"**
   - Optional, lead's call: "Alternate dark and light sections. One brand hue plus one action colour (button) is the default."
   - Antixor's pairs (navy + orange, green + yellow) are two different hues. The brief says navy + icy cyan, and the brief wins. Only change this if the user asks for orange.

Not over-correcting, leave alone: the no-gradient-blob, no-glassmorphism, no-emoji-icon, no-invented-proof-on-real-client rules, the motion rules (no JS video iframe, no parallax) and every hard limit.

## Recommendation

Add four things, in this order: **photo service cards with price (3)**, **floating stat card on the hero (1)**, **photo CTA band (10)**, **review faces (8)**. They give the most Antixor-like change per photo. Then the map (9), because it is free, then technician card (5) and the video block (7). Before/after (6) last, because the photos are the hardest to find. Amend `usad-design` items 1, 2, 3 and 8 first, or Bolt will follow the old rules and flatten it again.
