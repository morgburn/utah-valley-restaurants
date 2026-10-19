# Restaurants of Utah Valley: Prototype v1

Audrey Burrell and Morgan Burnside. The low-fi wireframe and tree test stay untouched in the repo root; this folder is the v1 prototype.

Live: `https://morgburn.github.io/utah-valley-restaurants/prototype/`

## Files

| File | What it is |
|---|---|
| `js/data.js` | **The single data source.** Schemes, all 47 restaurant blocks (title + summary stub), Explore picks, stand-in photos. Every change from the tree-tested hierarchy is marked `// [D#]`. |
| `js/concepts.js` | **The search concept layer.** 40 hand-built concepts (252 terms), each citing the card sort or tree test finding its words came from. |
| `js/search.js` | Search engine: literal match, name match with misspelling recovery, concept layer, dollar amounts, corrections, loosening suggestions. |
| `js/app.js` | Rendering. One block template, `block()`, draws every restaurant on Home, both views, related lists and search results. |
| `js/log.js` | Logging. One delegated listener logs every click; searches get an id that every result click carries. |
| `css/style.css` | Visual system (palette, type scale, shapes). |
| `log.html` | Test log: participant name, JSON and CSV export, clear. Linked in every page footer. |

## Hierarchy changes (Tree Test Report, section 6)

| Decision | Where it shows |
|---|---|
| D1 Pasta category; Roni's Mac Bar cross-listed, stays in Burgers & Grill | `data.js` Food Type values; Roni's `category: ["burgers-grill", "pasta"]` |
| D1+ (deviation) Pasta also holds Brick Oven and Pizzeria Seven Twelve (both stay in Pizza) and two new blocks, Olive Garden and The Old Spaghetti Factory | Justification: a one-card category reads as broken, and Abbie's (S5) "Italian" pile and Katelyn's "Pasta" expectation describe a pasta/Italian group, not one restaurant. Adds "American Fork" to the City values for Olive Garden. |
| D2 Dining Experience on the same nav line as Food Type | `app.js` `header()`; `.views` in CSS |
| D3 Filter order: other view first, then price, then city | `filters` arrays in `data.js` |
| D4 Sticky rail, no "Filter" heading, "Narrow by …" labels, live counts | `narrowLabel` in `data.js`; `wireCategory()`; `.rail { position: sticky }` |
| D5 Home "Explore" replaces the two tile grids | *Replaced by P1 below* |
| D6 Costa Vida cross-listed under Counter Service | Costa Vida `dining: ["quick", "counter"]` |
| D7 Log Haven and The Tree Room get a food type (Burgers & Grill) | their `category` arrays |

### Changes from professor feedback (P1)

| Change | Where it shows |
|---|---|
| Header nav lists only the Food Type categories; Dining Experience is removed from the nav | `nav: false` on the `dining` scheme in `data.js`; `header()` |
| Cuisine pages narrow by Dining Experience (Quick & Cheap, Counter Service, Sit-Down, Fine Dining) instead of Service Style | `filters: ["dining", "price", "city"]` on `category` |
| Home has two card sections: "What are we craving?" (one card per food type) and "How do we want to eat?" (one card per dining experience); Explore removed | `homeSections` in `data.js`; `home()` / `viewCard()` |
| Search results use the same left "Narrow by" rail as category pages | `railHtml()` shared by `wireCategory()` and `wireSearch()` |
| Stacked "Utah / Valley / Eats" wordmark on the same left edge as the nav and page content; search centered on the bar | `.bar` 3-column grid in CSS |

Coverage: all 47 blocks are reachable in **both** views (Dining Experience pages are reached from the Home cards).

## Palette

| Role | Value | Used for |
|---|---|---|
| Base | `#2B4C8C` navy | nav band, links, price chip outline |
| Tint | `#DCE5F5` ice | chips, current nav item, "We searched for" chips |
| Light tint | `#E6EDF8` | ground of the Narrow-by rail and search facet panel (a lighter step of the same tint) |
| Shade | `#142648` midnight | header band, headings, restaurant names |
| Accent | `#E59A1A` amber (complement of navy) | **only** the Search button and checked Narrow-by filters (category pages and search results) |

Neutrals: page `#ECF0F6`, card `#FFFFFF`, ink `#1A2233`, muted `#5A6478`, rule `#D5DCE8`.

Type: DM Serif Display for page titles and restaurant names, DM Sans for everything else.

## Logging

Event types: `page_view`, `click`, `filter`, `facet`, `search`, `result_click`, `session_start`. Each event has time, session, participant, page, label, target, and for search work the query id (`qid`), query text and result rank. `search` events store what the engine understood (concepts, corrections, ignored words, result count, top 5). Stored in `localStorage` (key `uvr_v1_log`), so it persists across pages and reloads in the same browser; export from `log.html`.

## Photos

Stand-ins from Unsplash (free license), one per food type plus a few dish photos. To use a real photo, put it in `images/` and add `image: "images/<file>.jpg"` to that restaurant in `data.js`.
