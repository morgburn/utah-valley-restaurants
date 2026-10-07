# Restaurants of Utah Valley: Low-Fi Wireframe

A clickable, low-fidelity wireframe for usability testing. It is built from the information architecture produced by our card sort (Audrey Burrell and Morgan Burnside).

## Structure (category hub)

```
Home (7 category tiles)
 └─ Category page  (category.html?id=…)  – filter by Price and Service style
     └─ Restaurant page (restaurant.html?id=…&from=…)
```

- **Primary categories:** Asian, Burgers & Grill, Mexican, Pizza, Dessert, Breakfast & Cafe, Hawaiian
- **Facets (filters):** Price per person ($ = under $12, $$ = $12–$18, $$$ = over $18), Service style (Sit-down / Counter service / Fast food), City (Provo, Orem, Springville, Lindon, Pleasant Grove, Lehi, Sundance, Salt Lake area)
- **Multi-category restaurants:** Cubby's (Burgers & Grill + Breakfast & Cafe) and BYU Creamery (Dessert + Burgers & Grill). Both overlaps come from the card sort.

## Editing the data

All content lives in **`data.js`**. No other file needs to change.

| To… | Do this in `data.js` |
|---|---|
| Add a restaurant | Copy a restaurant entry and give it a new `id`, `name`, and `tags` |
| Remove a restaurant | Delete its entry |
| Put a restaurant in more categories | Add more ids to its `tags.category` list |
| Add or rename a category | Edit the `values` of the `category` scheme |
| Add a new facet (e.g. Occasion) | Add a scheme with `role: "filter"` and tag restaurants with it |
| Reorganize the site around a different scheme | Move `role: "primary"` to that scheme |

## Hosting

The site is static, so GitHub Pages can serve it directly. Go to **Settings → Pages → Deploy from branch → `main` / root**.
