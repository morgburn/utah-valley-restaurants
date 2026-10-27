# Restaurants of Utah Valley: Final Prototype

Audrey Burrell and Morgan Burnside.

Live: `https://morgburn.github.io/utah-valley-restaurants/final/`

Prototype v1 stays live and unchanged at `/prototype/`. The exact version used in the talk-aloud study is also saved on the branch **`prototype-v1-tested`**.

## Changes from the talk-aloud study

| # | Change | Where it shows |
|---|---|---|
| F1 | "Quick & Cheap" renamed **Fast Food**. Cheap is already covered by the price filters, and "Fast Food" matches participants' words for the other service-style categories. Members are unchanged. Searching "fast food" or "quick and cheap" now opens this category. | `data.js` dining values; `concepts.js` `fastfood` concept |
| F2 | **Search understands numbers.** "88", "kitchen 88" and "eighty-eight" find Kitchen Eighty-Eight. "712" and "seven twelve" find Pizzeria Seven Twelve, and "5 sushi" finds Five Sushi Brothers. "$10" and "10 dollars" still mean price. | `search.js` step 1b, `numberRuns()`, `nameVariants()` |
| F3 | **Header nav** spreads across the full width of the header, with larger text (15–19px, semibold). The search band is a lighter navy (`--header` #1E3768, was #142648) so the nav stands out more. *Nav later removed, see F7; the lighter band stays.* | `css/style.css` `.views`, `.site-header` |

## Upgrades to a fully working prototype

| # | Change | Where it shows |
|---|---|---|
| F4 | **Full restaurant pages**: description, Website / Call / Directions buttons, price, categories, "Known For", "Good to Know" tips, and every listed location with address (opens Google Maps), phone (tap to call) and hours. Chains also say which other cities they are in. Details were checked October 2026. | `js/details.js` (data), `restaurant()` in `app.js` |
| F5 | **Real photos for all 47 restaurants.** 21 are hotlinked from the restaurants' own websites; the other 26 were supplied by the team and are stored in `final/images/` (resized to 1200px max). Each is credited on its restaurant page. If a hotlinked photo ever fails to load, the food stand-in appears instead and the caption switches to match. To change a photo, set `photo:` on that restaurant in `details.js`. | `photoOf()`, `App.photoFailed()` in `app.js`; `images/` |
| F9 | **Food photos on the cards.** Photos of buildings or entrances were replaced with food photos so the grid compares like with like. Log Haven, the Tree Room and Ruth's Diner keep setting photos, because the setting is the reason people go. | `details.js` |
| F10 | **Same four filter groups on every category page, with the entry category pre-checked.** Food Type, Dining Experience, Price, City, in that order (replaces D3's "other view first"). On the Mexican page, Mexican starts checked in Narrow by Food Type, so people can add Pizza or switch to Pizza without going back Home. The heading, breadcrumb and tab title follow the checked Food Type / Dining Experience boxes: "Mexican", "Mexican and Pizza", "Mexican · Fast Food", or "All Restaurants" when nothing is checked. A restaurant's breadcrumb leads back to the exact list it was opened from. | `wireCategory()` in `app.js` |
| F11 | **Sidebar is full length and scrolls with the page** (was sticky with its own scrollbar). With four groups it no longer fits on one screen, and a scroll box inside a scrolling page hides Price and City. Every option always shows (grayed out at 0), so the sidebar keeps the same height. | `.rail` in `style.css` |
| F12 | **Dining Experience re-sorted by how you're served**, not by price (the old Quick & Cheap rule put every $ place in Fast Food). Fast Food = ready in a minute or two, often a drive-thru. Counter Service = order at the counter, made to order. Places that are both are cross-listed. Fast Food only: Panda Express, Chick-fil-A, Crown Burgers, Purple Turtle, J. Dawgs. Both: Cafe Rio, Costa Vida, Cupbop, CHOM Burger, Don Joaquin, Lone Star, Don Chuy, Mo' Bettahs. Moved to Counter Service only: Brooker's, Crumbl, BYU Creamery, The Kolache Place, Guru's Cafe (was Sit-Down), Cubby's (was also Sit-Down). Brick Oven and Pizzeria Seven Twelve moved from Fine Dining to Sit-Down. Every restaurant stays in at least one of the four. | `dining` tags in `data.js` |
| F7 | **Category nav bar removed** (Asian, Burgers & Grill, ...). People browse from the Home page cards ("What are we craving?" / "How do we want to eat?"), the breadcrumbs, the "Narrow by" filters and search. The wordmark links back to Home. | `header()` in `app.js` |
| F8 | **Cafe Rio cross-listed under Fast Food** (stays in Counter Service too) and moved from $$ to **$**, matching Costa Vida. Their menu prices are about the same (burrito ≈ $11.50–12.50). | Cafe Rio `dining: ["quick", "counter"]` in `data.js` |
| F6 | **Corrected facts** found while researching (see below). | `data.js` lines marked `// [F6]` |

### F6 corrections

- **Kitchen Eighty-Eight** is a grill in American Fork (tri-tip and burgers, started as a food truck), not a Provo breakfast cafe. It moved from Breakfast & Cafe to Burgers & Grill, and from Sit-Down + Counter Service to Counter Service. City changed from Provo to American Fork. Name now spelled with a hyphen, as the restaurant writes it.
- **BYU Creamery on 9th** is officially **BYU Creamery on Ninth**.
- **CHOM Burger** also has an American Fork location.
- **Budda's Bakery & Breakfast** has one location (Pleasant Grove), not two.
- Summaries for The Brunch House, Guru's Cafe, Taquería Don Chuy, Cubby's, Lone Star Taqueria and Five Sushi Brothers were rewritten to match what they actually serve.

Takashi, Crown Burgers, Red Iguana and Settebello list no hours, because the sources disagreed. Their pages say to call or check the website.

## Files

Same as v1 (see `../prototype/README.md`), plus `js/details.js`, which holds the per-restaurant details.
