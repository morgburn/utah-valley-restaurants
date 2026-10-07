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

- **Chains / multi-location restaurants:** flagged with `multipleLocations: true`. Cards say "Multiple locations," and the restaurant page lists the cities. Each is tagged with every city it's in, so the City filter still finds it.

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

## Tree test

Open **`treetest.html`**, or click **Start tree test** in the wireframe's header.

1. The facilitator enters a participant name or ID, and the participant reads the instructions.
2. The 10 tasks from `tasks.js` appear one at a time, **in a new random order for every participant**.
3. Each task starts on Home. The participant browses the real wireframe, using the category pages and filters.
4. A task ends when they **click any restaurant card**, or press **"I would give up."**
5. When the run is finished, a CSV downloads automatically: `treetest_<participant>_<date>.csv`. There is one file per participant, so combine them for analysis by pasting them into one sheet. If a run is interrupted, reopening `treetest.html` in the same tab lets you resume it or download the partial results.

### CSV columns (one row per task)

| Column | Meaning |
|---|---|
| participant, session_start | Who took the test, and when |
| task_position | Where the task appeared in this participant's random order (1–10) |
| task_id, task_text | Which task it was, and the exact text shown |
| target, predicted_first_click | Copied from `tasks.js`, for the report |
| first_click | The first thing they clicked (a category or a filter) |
| click_path | The full path, e.g. `Home > Asian > [Filter Price per person: $$ ($12–$18) on] > [Back] Home > Mexican > Costa Vida` |
| final_block, final_category | The restaurant they chose, and the category page they chose it from |
| outcome | `selected` or `gave_up`. A give-up leaves final_block blank, so it's never confused with a wrong pick |
| page_clicks, filter_changes | Number of page navigations, and number of filter clicks |
| back_button_uses, revisits | Directness signals: browser Back presses, and returns to a page already seen in this task |
| seconds | Time from "Start task" to the final click |

To change the tasks, edit `tasks.js`. The base wireframe pages are unchanged except for the Start tree test button.
