# Restaurants of Utah Valley: Final Prototype

Audrey Burrell and Morgan Burnside.

Live: `https://morgburn.github.io/utah-valley-restaurants/final/`

Prototype v1 stays live and unchanged at `/prototype/`. The exact version used in the talk-aloud study is also saved on the branch **`prototype-v1-tested`**.

## Changes from the talk-aloud study

| # | Change | Where it shows |
|---|---|---|
| F1 | "Quick & Cheap" renamed **Fast Food**. Cheap is already covered by the price filters, and "Fast Food" matches participants' words for the other service-style categories. Members are unchanged. Searching "fast food" or "quick and cheap" now opens this category. | `data.js` dining values; `concepts.js` `fastfood` concept |
| F2 | **Search understands numbers.** "88", "kitchen 88" and "eighty-eight" find Kitchen Eighty-Eight. "712" and "seven twelve" find Pizzeria Seven Twelve, and "5 sushi" finds Five Sushi Brothers. "$10" and "10 dollars" still mean price. | `search.js` step 1b, `numberRuns()`, `nameVariants()` |
| F3 | **Header nav** spreads across the full width of the header, with larger text (15–19px, semibold). The search band is a lighter navy (`--header` #1E3768, was #142648) so the nav stands out more. | `css/style.css` `.views`, `.site-header` |

## Upgrades to a fully working prototype

| # | Change | Where it shows |
|---|---|---|
| F4 | **Full restaurant pages**: description, Website / Call / Directions buttons, price, categories, "Known For", "Good to Know" tips, and every listed location with address (opens Google Maps), phone (tap to call) and hours. Chains also say which other cities they are in. Details were checked October 2026. | `js/details.js` (data), `restaurant()` in `app.js` |
| F5 | **Real photos with a fallback.** Add `photo: "<url>"` (and optionally `photoCredit`) to a restaurant in `details.js`. If the image fails to load, the food stand-in appears instead and the caption switches to match. | `photoOf()`, `App.photoFailed()` in `app.js` |
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
