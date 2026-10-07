/*
 * ============================================================
 *  DATA FILE: edit this file to change the site.
 * ============================================================
 *
 *  SCHEMES are the ways restaurants can be classified.
 *    - role "primary": the scheme the home page and global nav are built from.
 *      Only one scheme should be primary. To reorganize the whole site around
 *      a different scheme, move "primary" to that scheme.
 *    - role "filter": shows as a checkbox filter on category pages
 *      and as a label on restaurant pages.
 *    - role "hidden": kept in the data but not shown anywhere.
 *    To add a new scheme (for example "occasion"), add an entry here and
 *    add matching tags to each restaurant.
 *
 *  RESTAURANTS
 *    - id: a unique, URL-safe slug. It is used in links (restaurant.html?id=...).
 *    - tags: one list of value ids per scheme. A restaurant can carry SEVERAL
 *      values in any scheme, so one restaurant can appear in more than one category.
 *    - To add a restaurant, copy an entry and change it.
 *      To remove one, delete its entry. Nothing else needs to change.
 */

window.SITE = {
  title: "Restaurants of Utah Valley",

  schemes: [
    {
      id: "category",
      label: "Category",
      role: "primary",
      values: [
        { id: "asian",          label: "Asian" },
        { id: "burgers-grill",  label: "Burgers & Grill" },
        { id: "mexican",        label: "Mexican" },
        { id: "pizza",          label: "Pizza" },
        { id: "dessert",        label: "Dessert" },
        { id: "breakfast-cafe", label: "Breakfast & Cafe" },
        { id: "hawaiian",       label: "Hawaiian" }
      ]
    },
    {
      id: "price",
      label: "Price per person",
      role: "filter",
      // Tiers estimate the price of a typical main dish for one person (Oct 2026),
      // based on menu prices mentioned in recent Google reviews where available.
      values: [
        { id: "1", label: "$ (under $12)" },
        { id: "2", label: "$$ ($12–$18)" },
        { id: "3", label: "$$$ (over $18)" }
      ]
    },
    {
      id: "service",
      label: "Service style",
      role: "filter",
      values: [
        { id: "sit-down", label: "Sit-down" },
        { id: "counter",  label: "Counter service" },
        { id: "fast",     label: "Fast food" }
      ]
    }
  ],

  restaurants: [
    // ---------- Asian ----------
    { id: "five-sushi-brothers", name: "Five Sushi Brothers",
      tags: { category: ["asian"], price: ["2"], service: ["counter"] } },
    { id: "thai-time", name: "Thai Time of Provo",
      tags: { category: ["asian"], price: ["2"], service: ["counter"] } },
    { id: "cupbop", name: "Cupbop",
      tags: { category: ["asian"], price: ["1"], service: ["counter"] } },
    { id: "panda-express", name: "Panda Express",
      tags: { category: ["asian"], price: ["1"], service: ["fast"] } },

    // ---------- Burgers & Grill ----------
    { id: "chom-burger", name: "CHOM Burger",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"] } },
    { id: "seven-brothers", name: "Seven Brothers Burgers",
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"] } },
    { id: "j-dawgs", name: "J. Dawgs",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"] } },
    { id: "chick-fil-a", name: "Chick-fil-A",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["fast"] } },
    { id: "rodizio", name: "Rodizio Grill",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"] } },
    { id: "ronis-mac-bar", name: "Roni's Mac Bar",
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"] } },
    // Multi-category: grouped with burgers (S3, S5) and cafes (S6, S9)
    { id: "cubbys", name: "Cubby's",
      tags: { category: ["burgers-grill", "breakfast-cafe"], price: ["2"], service: ["sit-down"] } },

    // ---------- Mexican ----------
    { id: "cafe-rio", name: "Cafe Rio",
      tags: { category: ["mexican"], price: ["2"], service: ["fast"] } },
    { id: "costa-vida", name: "Costa Vida",
      tags: { category: ["mexican"], price: ["1"], service: ["fast"] } },
    { id: "don-joaquin", name: "Don Joaquin Street Tacos",
      tags: { category: ["mexican"], price: ["1"], service: ["counter"] } },
    { id: "the-taco-spot", name: "The Taco Spot",
      tags: { category: ["mexican"], price: ["2"], service: ["counter"] } },

    // ---------- Pizza ----------
    { id: "brick-oven", name: "Brick Oven",
      tags: { category: ["pizza"], price: ["3"], service: ["sit-down"] } },
    { id: "fat-daddys", name: "Fat Daddy's Pizzeria",
      tags: { category: ["pizza"], price: ["2"], service: ["sit-down"] } },

    // ---------- Dessert ----------
    // Multi-category: started in burger piles in several sorts and stayed there in S3
    { id: "byu-creamery", name: "BYU Creamery on 9th",
      tags: { category: ["dessert", "burgers-grill"], price: ["1"], service: ["counter"] } },
    { id: "brookers", name: "Brooker's Founding Flavors Ice Cream",
      tags: { category: ["dessert"], price: ["1"], service: ["counter"] } },

    // ---------- Breakfast & Cafe ----------
    { id: "dennys", name: "Denny's",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"] } },
    { id: "the-brunch-house", name: "The Brunch House",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"] } },
    { id: "gurus-cafe", name: "Guru's Cafe",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"] } },
    { id: "kitchen-eighty-eight", name: "Kitchen Eighty Eight",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["fast"] } },

    // ---------- Hawaiian ----------
    { id: "mo-bettahs", name: "Mo' Bettahs",
      tags: { category: ["hawaiian"], price: ["2"], service: ["fast"] } },
    { id: "hungry-hawaiian", name: "Hungry Hawaiian Provo",
      tags: { category: ["hawaiian"], price: ["2"], service: ["counter"] } }
  ]
};
