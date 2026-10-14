/*
 * ============================================================
 *  THE SINGLE DATA SOURCE for Prototype v1.
 *  Every page (Home Explore, both browse views, restaurant pages
 *  and search results) renders from this file through one block
 *  template (App.block in app.js). Nothing is hard-coded per block.
 * ============================================================
 *
 *  SCHEMES   ways a restaurant is classified.
 *    role "browse": a header-nav view with its own category pages.
 *       "filters" = the Narrow-by groups on that view's pages, IN ORDER.
 *       Tree-test decision D3: the other view's scheme comes first, then
 *       price, then city.
 *    role "filter": used only for narrowing (and shown on blocks).
 *    "narrowLabel" is the sidebar label (decision D4: "Narrow by ...").
 *
 *  RESTAURANTS  each one is a block: title (name) + summary stub.
 *    tags: one list of value ids per scheme. A restaurant can carry
 *    several values in one scheme, so it can live in several categories
 *    ("cross-listed, not moved").
 *    photo: a key in PHOTOS. Leave it out to use the photo for the
 *    restaurant's first food type. To use your own photo, put the file in
 *    prototype/images/ and set  image: "images/<file>.jpg".
 *
 *  Changes from the tree-tested hierarchy are marked  // [D#]  with the
 *  decision number from the Tree Test Report, section 6.
 */

window.SITE = {
  title: "Restaurants of Utah Valley",
  shortTitle: "Utah Valley Eats",

  schemes: [
    {
      id: "category", label: "Food Type", role: "browse",
      narrowLabel: "Narrow by Food Type",
      filters: ["service", "price", "city"],            // [D3] service style moved to 1st
      values: [
        { id: "asian",          label: "Asian" },
        { id: "burgers-grill",  label: "Burgers & Grill" },
        { id: "mexican",        label: "Mexican" },
        { id: "pizza",          label: "Pizza" },
        { id: "pasta",          label: "Pasta" },        // [D1] new category
        { id: "dessert",        label: "Dessert" },
        { id: "breakfast-cafe", label: "Breakfast & Cafe" },
        { id: "hawaiian",       label: "Hawaiian" }
      ]
    },
    {
      id: "dining", label: "Dining Experience", role: "browse",
      narrowLabel: "Narrow by Dining Experience",
      filters: ["category", "price", "city"],            // [D3] food type first
      values: [
        { id: "quick",    label: "Quick & Cheap" },
        { id: "counter",  label: "Counter Service" },
        { id: "sit-down", label: "Sit-Down" },
        { id: "fine",     label: "Fine Dining" }
      ]
    },
    {
      id: "price", label: "Price per Person", role: "filter",
      narrowLabel: "Narrow by Price",                    // [D4] renamed
      values: [
        { id: "1", label: "$", detail: "under $12" },
        { id: "2", label: "$$", detail: "$12–$18" },
        { id: "3", label: "$$$", detail: "over $18" }
      ]
    },
    {
      id: "service", label: "Service Style", role: "filter",
      narrowLabel: "Narrow by Service Style",            // [D4] renamed
      values: [
        { id: "sit-down", label: "Sit-Down" },
        { id: "counter",  label: "Counter Service" },
        { id: "fast",     label: "Fast Food" }
      ]
    },
    {
      id: "city", label: "City", role: "filter",
      narrowLabel: "Narrow by City",                     // [D4] renamed
      multipleLabel: "Multiple Locations",
      values: [
        { id: "provo",          label: "Provo" },
        { id: "orem",           label: "Orem" },
        { id: "springville",    label: "Springville" },
        { id: "lindon",         label: "Lindon" },
        { id: "pleasant-grove", label: "Pleasant Grove" },
        { id: "american-fork",  label: "American Fork" }, // added for Olive Garden
        { id: "lehi",           label: "Lehi" },
        { id: "sundance",       label: "Sundance" },
        { id: "salt-lake",      label: "Salt Lake Area" }
      ]
    }
  ],

  restaurants: [
    // ---------- Asian ----------
    { id: "five-sushi-brothers", name: "Five Sushi Brothers", photo: "sushi",
      summary: "Sushi rolls and poke bowls ordered at the counter in Provo.",
      tags: { category: ["asian"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo"] } },
    { id: "thai-time", name: "Thai Time of Provo",
      summary: "Curries, pad thai and fried rice, ordered at the counter.",
      tags: { category: ["asian"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo"] } },
    { id: "cupbop", name: "Cupbop", multipleLocations: true,
      summary: "Korean barbecue rice bowls served in a cup, fast and filling.",
      tags: { category: ["asian"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "panda-express", name: "Panda Express", multipleLocations: true,
      summary: "Orange chicken, chow mein and other American Chinese plates, served fast.",
      tags: { category: ["asian"], price: ["1"], service: ["fast"], dining: ["quick"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "pho-plus", name: "Pho Plus", multipleLocations: true, photo: "pho",
      summary: "Vietnamese pho and noodle dishes brought to your table.",
      tags: { category: ["asian"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["provo", "orem"] } },
    { id: "takashi", name: "Takashi", photo: "sushi",
      summary: "Upscale sushi and Japanese small plates in downtown Salt Lake City.",
      tags: { category: ["asian"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["salt-lake"] } },
    { id: "tsunami-lehi", name: "Tsunami Restaurant & Sushi Bar", multipleLocations: true, photo: "sushi",
      summary: "Sushi bar and Japanese fusion dinners in a sit-down dining room.",
      tags: { category: ["asian"], price: ["3"], service: ["sit-down"], dining: ["fine", "sit-down"], city: ["lehi", "salt-lake"] } },

    // ---------- Burgers & Grill ----------
    { id: "chom-burger", name: "CHOM Burger", multipleLocations: true,
      summary: "Smash burgers, fries and shakes ordered at the counter.",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo"] } },
    { id: "seven-brothers", name: "Seven Brothers Burgers", multipleLocations: true,
      summary: "Hawaiian-born burger joint with big burgers and fries.",
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo", "pleasant-grove", "salt-lake"] } },
    { id: "j-dawgs", name: "J. Dawgs", multipleLocations: true, photo: "hotdog",
      summary: "Grilled hot dogs and Polish sausages with a signature sauce.",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "chick-fil-a", name: "Chick-fil-A", multipleLocations: true,
      summary: "Chicken sandwiches, nuggets and waffle fries, plus cones and milkshakes.",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["fast"], dining: ["quick"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "rodizio", name: "Rodizio Grill", multipleLocations: true, photo: "steak",
      summary: "Brazilian steakhouse where servers carve grilled meats at your table.",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["provo", "salt-lake"] } },
    { id: "ronis-mac-bar", name: "Roni's Mac Bar", multipleLocations: true, photo: "mac",
      summary: "Build-your-own mac and cheese bowls with grill-style toppings.",
      tags: { category: ["burgers-grill", "pasta"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo"] } }, // [D1] also Pasta
    { id: "cubbys", name: "Cubby's", multipleLocations: true,
      summary: "Chargrilled burgers, salads and breakfast in a casual setting.",
      tags: { category: ["burgers-grill", "breakfast-cafe"], price: ["2"], service: ["sit-down"], dining: ["sit-down", "counter"], city: ["provo", "salt-lake"] } },
    { id: "tucanos", name: "Tucanos Brazilian Grill", multipleLocations: true, photo: "steak",
      summary: "Brazilian churrascaria with all-you-can-eat grilled meats and a salad bar.",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["orem", "salt-lake"] } },
    { id: "bam-bams-bbq", name: "Bam Bam's BBQ", photo: "bbq",
      summary: "Smoked ribs, brisket and pulled pork ordered at the counter.",
      tags: { category: ["burgers-grill"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["orem"] } },
    { id: "purple-turtle", name: "Purple Turtle", photo: "shake",
      summary: "Old-school drive-in with burgers, fries and thick shakes.",
      tags: { category: ["burgers-grill", "dessert"], price: ["1"], service: ["fast"], dining: ["quick"], city: ["pleasant-grove"] } },
    { id: "crown-burgers", name: "Crown Burgers", multipleLocations: true,
      summary: "Utah-style pastrami burgers with fries and fry sauce.",
      tags: { category: ["burgers-grill"], price: ["1"], service: ["fast"], dining: ["quick"], city: ["salt-lake"] } },
    { id: "log-haven", name: "Log Haven", photo: "steak",
      summary: "Fine dining in a historic log mansion up Millcreek Canyon.",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["salt-lake"] } },   // [D7] first food-type home
    { id: "tree-room", name: "The Tree Room at Sundance", photo: "steak",
      summary: "Mountain dining room at Sundance Resort with seasonal American dishes.",
      tags: { category: ["burgers-grill"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["sundance"] } },     // [D7] first food-type home

    // ---------- Mexican ----------
    { id: "cafe-rio", name: "Cafe Rio", multipleLocations: true, photo: "burrito",
      summary: "Sweet pork burritos, salads and fresh tortillas made in front of you.",
      tags: { category: ["mexican"], price: ["2"], service: ["fast"], dining: ["counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "costa-vida", name: "Costa Vida", multipleLocations: true, photo: "burrito",
      summary: "Burritos, salads and sweet pork made fast at the counter.",
      tags: { category: ["mexican"], price: ["1"], service: ["fast"], dining: ["quick", "counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } }, // [D6] also Counter service
    { id: "don-joaquin", name: "Don Joaquin Street Tacos", multipleLocations: true,
      summary: "Street tacos and quesadillas with a self-serve salsa bar.",
      tags: { category: ["mexican"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo", "lindon", "springville"] } },
    { id: "the-taco-spot", name: "The Taco Spot", multipleLocations: true,
      summary: "Tacos, burritos and Mexican plates ordered at the counter.",
      tags: { category: ["mexican"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo"] } },
    { id: "taqueria-don-chuy", name: "Taquería Don Chuy",
      summary: "Small Springville taqueria for tacos, burritos and breakfast plates.",
      tags: { category: ["mexican", "breakfast-cafe"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["springville"] } },
    { id: "red-iguana", name: "Red Iguana", multipleLocations: true,
      summary: "Salt Lake City favorite for mole and Mexican dishes, served at the table.",
      tags: { category: ["mexican"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["salt-lake"] } },
    { id: "lone-star-taqueria", name: "Lone Star Taqueria",
      summary: "Casual taco stand known for fish tacos and burritos.",
      tags: { category: ["mexican"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["salt-lake"] } },

    // ---------- Pizza ----------
    { id: "brick-oven", name: "Brick Oven",
      summary: "Long-running Provo spot for pizza, pasta and house root beer.",
      tags: { category: ["pizza", "pasta"], price: ["3"], service: ["sit-down"], dining: ["fine", "sit-down"], city: ["provo"] } }, // [D1+] also Pasta
    { id: "fat-daddys", name: "Fat Daddy's Pizzeria",
      summary: "Casual sit-down pizzeria with big pies and wings.",
      tags: { category: ["pizza"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["provo"] } },
    { id: "pizzeria-712", name: "Pizzeria Seven Twelve",
      summary: "Wood-fired pizza and seasonal Italian plates.",
      tags: { category: ["pizza", "pasta"], price: ["3"], service: ["sit-down"], dining: ["fine"], city: ["orem"] } },            // [D1+] also Pasta
    { id: "settebello", name: "Settebello Pizzeria Napoletana",
      summary: "Neapolitan wood-fired pizza in downtown Salt Lake.",
      tags: { category: ["pizza"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["salt-lake"] } },

    // ---------- Pasta (new) ----------
    { id: "olive-garden", name: "Olive Garden", multipleLocations: true,
      summary: "Italian-American chain for pasta, breadsticks and salad, served at the table.",
      tags: { category: ["pasta"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["american-fork", "salt-lake"] } }, // [D1+] new block
    { id: "old-spaghetti-factory", name: "The Old Spaghetti Factory", multipleLocations: true, photo: "spaghetti",
      summary: "Classic spaghetti dinners with bread, salad and spumoni.",
      tags: { category: ["pasta"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["salt-lake"] } },              // [D1+] new block

    // ---------- Dessert ----------
    { id: "byu-creamery", name: "BYU Creamery on 9th", photo: "cone",
      summary: "Campus favorite for ice cream cones, shakes and cheap burgers.",
      tags: { category: ["dessert", "burgers-grill"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo"] } },
    { id: "brookers", name: "Brooker's Founding Flavors Ice Cream", multipleLocations: true,
      summary: "Scoop shop with rotating flavors, cones and shakes.",
      tags: { category: ["dessert"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo", "salt-lake"] } },
    { id: "crumbl", name: "Crumbl Cookies", multipleLocations: true, photo: "cookies",
      summary: "A rotating weekly menu of giant gourmet cookies.",
      tags: { category: ["dessert"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },

    // ---------- Breakfast & Cafe ----------
    { id: "dennys", name: "Denny's", multipleLocations: true,
      summary: "All-day breakfast diner with pancakes, eggs and late hours.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["provo", "orem", "lehi", "salt-lake"] } },
    { id: "the-brunch-house", name: "The Brunch House",
      summary: "Sit-down brunch with pancakes, benedicts and fresh juice.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["provo"] } },
    { id: "gurus-cafe", name: "Guru's Cafe", multipleLocations: true,
      summary: "Laid-back cafe with rice bowls, quesadillas and salads.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["provo", "orem"] } },
    { id: "kitchen-eighty-eight", name: "Kitchen Eighty Eight", multipleLocations: true,
      summary: "Breakfast and lunch cafe with counter ordering and tables to stay.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["fast"], dining: ["counter", "sit-down"], city: ["provo"] } },
    { id: "kneaders", name: "Kneaders Bakery & Cafe", multipleLocations: true,
      summary: "Bakery-cafe with sandwiches, soups, pastries and French toast.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "ruths-diner", name: "Ruth's Diner",
      summary: "Classic canyon diner known for big breakfasts and biscuits.",
      tags: { category: ["breakfast-cafe"], price: ["2"], service: ["sit-down"], dining: ["sit-down"], city: ["salt-lake"] } },
    { id: "the-kolache-place", name: "The Kolache Place", multipleLocations: true,
      summary: "Sweet and savory kolaches and pastries to grab and go.",
      tags: { category: ["breakfast-cafe"], price: ["1"], service: ["counter"], dining: ["quick"], city: ["orem", "salt-lake"] } },

    // ---------- Hawaiian ----------
    { id: "mo-bettahs", name: "Mo' Bettahs", multipleLocations: true,
      summary: "Hawaiian plate lunches: teriyaki chicken, kalua pork, rice and mac salad.",
      tags: { category: ["hawaiian"], price: ["2"], service: ["fast"], dining: ["counter"], city: ["provo", "orem", "pleasant-grove", "lehi", "salt-lake"] } },
    { id: "hungry-hawaiian", name: "Hungry Hawaiian Provo",
      summary: "Hawaiian plate lunches ordered at the counter.",
      tags: { category: ["hawaiian"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["provo"] } },
    { id: "leilanis", name: "Leilani's Polynesian Place",
      summary: "Polynesian plate lunches ordered at the counter in Lindon.",
      tags: { category: ["hawaiian"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["lindon"] } },
    { id: "buddas-bakery", name: "Budda's Bakery & Breakfast", multipleLocations: true, photo: "pancakes",
      summary: "Hawaiian-style bakery and breakfast spot.",
      tags: { category: ["hawaiian", "breakfast-cafe"], price: ["2"], service: ["counter"], dining: ["counter"], city: ["pleasant-grove", "salt-lake"] } }
  ],

  // Home page "Explore" [D5]: each pick shows off a different way to narrow,
  // and its label links to the category page with that narrowing applied,
  // so people learn the header views instead of browsing from Home.
  explore: [
    { restaurant: "chom-burger",   label: "Under $12",              by: "dining",   id: "quick",    narrow: { price: ["1"] } },
    { restaurant: "pho-plus",      label: "Sit-Down Asian",         by: "category", id: "asian",    narrow: { service: ["sit-down"] } },
    { restaurant: "log-haven",     label: "Fine Dining in Salt Lake", by: "dining", id: "fine",     narrow: { city: ["salt-lake"] } },
    { restaurant: "byu-creamery",  label: "Cones and Shakes",       by: "category", id: "dessert",  narrow: {} },
    { restaurant: "ronis-mac-bar", label: "New: Pasta",             by: "category", id: "pasta",    narrow: {} },
    { restaurant: "mo-bettahs",    label: "Counter Service in Orem", by: "dining",  id: "counter",  narrow: { city: ["orem"] } }
  ]
};

/*
 * PHOTOS: free-licensed stand-ins from Unsplash (unsplash.com/license),
 * one per food type plus a few dish-specific ones. Swap in real restaurant
 * photos later with  image: "images/<file>.jpg"  on a restaurant.
 */
window.PHOTOS = {
  base: "https://images.unsplash.com/",
  params: "?auto=format&fit=crop&w=720&h=460&q=70",
  byCategory: {
    "asian": "noodles", "burgers-grill": "burger", "mexican": "tacos", "pizza": "pizza",
    "pasta": "pasta", "dessert": "icecream", "breakfast-cafe": "pancakes", "hawaiian": "bowl"
  },
  library: {
    noodles:   { id: "photo-1511910849309-0dffb8785146", by: "Sharon Chen" },
    pho:       { id: "photo-1631709497146-a239ef373cf1", by: "Jennifer Schmidt" },
    sushi:     { id: "photo-1579871494447-9811cf80d66c", by: "Vinicius Benedit" },
    burger:    { id: "photo-1561758033-d89a9ad46330",    by: "Jonathan Borba" },
    hotdog:    { id: "photo-1613482084286-41f25b486fa2", by: "Mateusz Feliksik" },
    steak:     { id: "photo-1600891964092-4316c288032e", by: "Tim Toomey" },
    bbq:       { id: "photo-1544025162-d76694265947",    by: "Alexandru-Bogdan Ghita" },
    mac:       { id: "photo-1667499989723-c4ab9549d63c", by: "Leanna Myers" },
    tacos:     { id: "photo-1599974579688-8dbdd335c77f", by: "Jeswin Thomas" },
    burrito:   { id: "photo-1626700051175-6818013e1d4f", by: "Max Griss" },
    pizza:     { id: "photo-1513104890138-7c749659a591", by: "Ivan Torres" },
    pasta:     { id: "photo-1621996346565-e3dbc646d9a9", by: "Ben Lei" },
    spaghetti: { id: "photo-1556761223-4c4282c73f77",    by: "Mae Mu" },
    icecream:  { id: "photo-1497034825429-c343d7c6a68f", by: "ian dooley" },
    cone:      { id: "photo-1629385701021-fcd568a743e8", by: "Courtney Cook" },
    shake:     { id: "photo-1572490122747-3968b75cc699", by: "Victor Rutka" },
    cookies:   { id: "photo-1499636136210-6f4ee915583e", by: "Jennifer Pallian" },
    pancakes:  { id: "photo-1528207776546-365bb710ee93", by: "nikldn" },
    bowl:      { id: "photo-1602881917445-0b1ba001addf", by: "David Foodphototasty" }
  }
};
