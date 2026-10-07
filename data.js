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
 *    - multipleLocations: true marks a chain or a restaurant with more than one
 *      location. Cards then say "Multiple locations" instead of one city. Tag its
 *      city list with every city (in the City scheme) where it has a location, so
 *      the City filter still finds it.
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
    },
    {
      id: "city",
      label: "City",
      role: "filter",
      // Shown on cards instead of a city when a restaurant has multipleLocations: true
      multipleLabel: "Multiple locations",
      values: [
        { id: "provo",          label: "Provo" },
        { id: "orem",           label: "Orem" },
        { id: "springville",    label: "Springville" },
        { id: "lindon",         label: "Lindon" },
        { id: "pleasant-grove", label: "Pleasant Grove" },
        { id: "lehi",           label: "Lehi" },
        { id: "sundance",       label: "Sundance" },
        { id: "salt-lake",      label: "Salt Lake area" }
      ]
    }
  ],

  restaurants: [
    // ---------- Asian ----------
    { id: "five-sushi-brothers", name: "Five Sushi Brothers",
      tags: { category: ["asian"], price: ["2"], service: ["counter"], city: ["provo"] } },
    { id: "thai-time", name: "Thai Time of Provo",
      tags: { category: ["asian"], price: ["2"], service: ["counter"], city: ["provo"] } },
    { id: "cupbop", name: "Cupbop", multipleLocations: true,
      tags: { category: ["asian"], price: ["1"], service: ["counter"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "panda-express", name: "Panda Express", multipleLocations: true,
      tags: { category: ["asian"], price: ["1"], service: ["fast"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },

    // ---------- Burgers & Grill ----------
    { id: "chom-burger", name: "CHOM Burger", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"], city: ["provo"] } },
    { id: "seven-brothers", name: "Seven Brothers Burgers", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"], city: ["provo", "pleasant-grove", "salt-lake"] } },
    { id: "j-dawgs", name: "J. Dawgs", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "chick-fil-a", name: "Chick-fil-A", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["1"], service: ["fast"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "rodizio", name: "Rodizio Grill", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], city: ["provo", "salt-lake"] } },
    { id: "ronis-mac-bar", name: "Roni's Mac Bar", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"], city: ["provo"] } },
    // Multi-category: grouped with burgers (S3, S5) and cafes (S6, S9)
    { id: "cubbys", name: "Cubby's", multipleLocations: true,
      tags: { category: ["burgers-grill", "breakfast-cafe"], price: ["2"], service: ["sit-down"], city: ["provo", "salt-lake"] } },

    // ---------- Mexican ----------
    { id: "cafe-rio", name: "Cafe Rio", multipleLocations: true,
      tags: { category: ["mexican"], price: ["2"], service: ["fast"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "costa-vida", name: "Costa Vida", multipleLocations: true,
      tags: { category: ["mexican"], price: ["1"], service: ["fast"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "don-joaquin", name: "Don Joaquin Street Tacos", multipleLocations: true,
      tags: { category: ["mexican"], price: ["1"], service: ["counter"], city: ["provo", "lindon", "springville"] } },
    { id: "the-taco-spot", name: "The Taco Spot", multipleLocations: true,
      tags: { category: ["mexican"], price: ["2"], service: ["counter"], city: ["provo"] } },

    // ---------- Pizza ----------
    { id: "brick-oven", name: "Brick Oven",
      tags: { category: ["pizza"], price: ["3"], service: ["sit-down"], city: ["provo"] } },
    { id: "fat-daddys", name: "Fat Daddy's Pizzeria",
      tags: { category: ["pizza"], price: ["2"], service: ["sit-down"], city: ["provo"] } },

    // ---------- Dessert ----------
    // Multi-category: started in burger piles in several sorts and stayed there in S3
    { id: "byu-creamery", name: "BYU Creamery on 9th",
      tags: { category: ["dessert", "burgers-grill"], price: ["1"], service: ["counter"], city: ["provo"] } },
    { id: "brookers", name: "Brooker's Founding Flavors Ice Cream", multipleLocations: true,
      tags: { category: ["dessert"], price: ["1"], service: ["counter"], city: ["provo", "salt-lake"] } },

    // ---------- Breakfast & Cafe ----------
    { id: "dennys", name: "Denny's", multipleLocations: true,
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "the-brunch-house", name: "The Brunch House",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], city: ["provo"] } },
    { id: "gurus-cafe", name: "Guru's Cafe", multipleLocations: true,
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], city: ["provo", "orem"] } },
    { id: "kitchen-eighty-eight", name: "Kitchen Eighty Eight", multipleLocations: true,
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["fast"], city: ["provo"] } },

    // ---------- Hawaiian ----------
    { id: "mo-bettahs", name: "Mo' Bettahs", multipleLocations: true,
      tags: { category: ["hawaiian"], price: ["2"], service: ["fast"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "hungry-hawaiian", name: "Hungry Hawaiian Provo",
      tags: { category: ["hawaiian"], price: ["2"], service: ["counter"], city: ["provo"] } },

    // ---------- Utah Valley: Orem ----------
    { id: "tucanos", name: "Tucanos Brazilian Grill", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], city: ["orem", "salt-lake"] } },
    { id: "pizzeria-712", name: "Pizzeria Seven Twelve",
      tags: { category: ["pizza"], price: ["3"], service: ["sit-down"], city: ["orem"] } },
    { id: "bam-bams-bbq", name: "Bam Bam's BBQ",
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"], city: ["orem"] } },
    { id: "pho-plus", name: "Pho Plus", multipleLocations: true,
      tags: { category: ["asian"], price: ["2"], service: ["sit-down"], city: ["provo", "orem"] } },
    { id: "crumbl", name: "Crumbl Cookies", multipleLocations: true,
      tags: { category: ["dessert"], price: ["1"], service: ["counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },

    // ---------- Utah Valley: other cities ----------
    { id: "taqueria-don-chuy", name: "Taquería Don Chuy",
      tags: { category: ["mexican", "breakfast-cafe"], price: ["1"], service: ["counter"], city: ["springville"] } },
    { id: "leilanis", name: "Leilani's Polynesian Place",
      tags: { category: ["hawaiian"], price: ["2"], service: ["counter"], city: ["lindon"] } },
    { id: "buddas-bakery", name: "Budda's Bakery & Breakfast", multipleLocations: true,
      tags: { category: ["hawaiian", "breakfast-cafe"], price: ["2"], service: ["counter"], city: ["pleasant-grove", "salt-lake"] } },
    { id: "purple-turtle", name: "Purple Turtle",
      tags: { category: ["burgers-grill", "dessert"], price: ["1"], service: ["fast"], city: ["pleasant-grove"] } },
    { id: "kneaders", name: "Kneaders Bakery & Cafe", multipleLocations: true,
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "tsunami-lehi", name: "Tsunami Restaurant & Sushi Bar", multipleLocations: true,
      tags: { category: ["asian"], price: ["3"], service: ["sit-down"], city: ["lehi", "salt-lake"] } },
    { id: "tree-room", name: "The Tree Room at Sundance",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], city: ["sundance"] } },

    // ---------- Salt Lake area ----------
    { id: "red-iguana", name: "Red Iguana", multipleLocations: true,
      tags: { category: ["mexican"], price: ["2"], service: ["sit-down"], city: ["salt-lake"] } },
    { id: "takashi", name: "Takashi",
      tags: { category: ["asian"], price: ["3"], service: ["sit-down"], city: ["salt-lake"] } },
    { id: "log-haven", name: "Log Haven",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], city: ["salt-lake"] } },
    { id: "settebello", name: "Settebello Pizzeria Napoletana",
      tags: { category: ["pizza"], price: ["2"], service: ["sit-down"], city: ["salt-lake"] } },
    { id: "ruths-diner", name: "Ruth's Diner",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], city: ["salt-lake"] } },
    { id: "lone-star-taqueria", name: "Lone Star Taqueria",
      tags: { category: ["mexican"], price: ["1"], service: ["counter"], city: ["salt-lake"] } },
    { id: "crown-burgers", name: "Crown Burgers", multipleLocations: true,
      tags: { category: ["burgers-grill"], price: ["1"], service: ["fast"], city: ["salt-lake"] } },
    { id: "the-kolache-place", name: "The Kolache Place", multipleLocations: true,
      tags: { category: ["breakfast-cafe"], price: ["1"], service: ["counter"], city: ["orem", "salt-lake"] } }
  ]
};
