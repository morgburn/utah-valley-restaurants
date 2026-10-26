/*
 * ============================================================
 *  SEARCH CONCEPT LAYER  (hand-built, no AI, no external services)
 * ============================================================
 *  Search always runs a literal keyword match first (name, summary and
 *  category labels). On top of that, this table turns the words people
 *  actually used in our studies into the site's categories and filters.
 *
 *  Every concept cites where its vocabulary came from:
 *    CS S1–S9  = Card Sort Report, participant pile labels and quotes
 *    TT T1–T10 = Tree Test task wording participants worked from
 *    TT notes  = Tree Test listening notes and analysis
 *
 *  role "what":   says WHAT someone wants (a food, a dish, an occasion).
 *                 Several "what" concepts in one query are OR'ed together
 *                 ("pho or sushi").
 *  role "narrow": a constraint (price, place, how you're served).
 *                 Narrow concepts are AND'ed with everything else, OR'ed
 *                 within the same scheme ("fancy" + "SLC").
 *
 *  tags: { scheme: [value ids] } from data.js
 *  restaurants: specific restaurant ids, for dish-level words
 *  shows: the short label the results page prints, e.g.  cone → Dessert
 */
window.CONCEPTS = [
  // ---------------- Food: what ----------------
  { id: "asian", role: "what", shows: "Asian",
    terms: ["asian", "asianish", "asian ish", "chinese", "japanese", "korean", "thai", "vietnamese", "orange chicken", "pad thai", "curry"],
    tags: { category: ["asian"] },
    source: "CS S1 'Asian(ish) Food', S4 'Variety of Asian places food', S3/S5 'Asian'" },
  { id: "foreign", role: "what", shows: "Asian or Hawaiian",
    terms: ["foreign", "ethnic", "ethnic food", "ethnic foods"],
    tags: { category: ["asian", "hawaiian"] },
    source: "CS S6 Jocelyn 'Foreign' pile (Hawaiian + Asian cards); she was most confident about an 'ethnic foods' group" },
  { id: "rice", role: "what", shows: "Asian or Hawaiian",
    terms: ["rice", "rice bowl", "rice bowls", "bowl", "bowls"],
    tags: { category: ["asian", "hawaiian"] },
    source: "CS S5 Abbie considered a 'restaurants that have rice' group; S9 Mason put Asian and Hawaiian together for the same 'vibe'" },
  { id: "sushi", role: "what", shows: "Sushi Places",
    terms: ["sushi", "sushi bar", "rolls", "sashimi"],
    restaurants: ["five-sushi-brothers", "tsunami-lehi", "takashi"],
    source: "TT T1 'a meal of pho or sushi'; 3 of 8 runs lost T1 between sushi places" },
  { id: "pho", role: "what", shows: "Pho Plus",
    terms: ["pho", "noodle soup", "vietnamese soup"],
    restaurants: ["pho-plus"],
    source: "TT T1 'a meal of pho or sushi'" },

  { id: "burgers", role: "what", shows: "Burgers & Grill",
    terms: ["burger", "burgers", "cheeseburger", "cheeseburgers", "cheese burger", "hamburger", "fries", "grill", "grilled",
            "cook out", "cookout", "american", "meat", "smash burger"],
    tags: { category: ["burgers-grill"] },
    source: "CS S3/S4/S6 'Burgers', S9 'Cook Out', S4 'American?' and 'Meat'; TT T2 'cheeseburger and fries'; TT notes Audrey: 'Feels like a burger place'" },
  { id: "chicken", role: "what", shows: "Chicken Places",
    terms: ["chicken", "yummy chicken", "chicken sandwich", "nuggets", "chicken nuggets", "teriyaki"],
    restaurants: ["chick-fil-a", "mo-bettahs", "panda-express"],
    source: "CS S1 Katie's 'Yummy Chicken' pile (Chick-fil-A)" },
  { id: "hotdog", role: "what", shows: "J. Dawgs",
    terms: ["hot dog", "hot dogs", "hotdog", "hotdogs", "dawgs", "sausage"],
    restaurants: ["j-dawgs"],
    source: "CS S1 'Pizza + Hot Dogs' pile; S4 'Meat' pile (J. Dawgs + Rodizio)" },
  { id: "brazilian", role: "what", shows: "Brazilian Grills",
    terms: ["brazilian", "churrasco", "churrascaria", "steakhouse", "steak", "all you can eat"],
    restaurants: ["rodizio", "tucanos"],
    source: "CS S1 'Brazilian' pile (Rodizio); S4 'Meat'" },
  { id: "bbq", role: "what", shows: "Bam Bam's BBQ",
    terms: ["bbq", "barbecue", "barbeque", "ribs", "brisket", "smoked"],
    restaurants: ["bam-bams-bbq"],
    source: "CS S9 'Cook Out' pile; S4 'Meat'" },

  { id: "mexican", role: "what", shows: "Mexican",
    terms: ["mexican", "taco", "tacos", "street tacos", "street taco", "burrito", "burritos", "quesadilla", "taqueria", "salsa", "enchilada"],
    tags: { category: ["mexican"] },
    source: "CS S1/S4 'Tacos', S3/S5/S6/S9 'Mexican'" },
  { id: "texmex", role: "what", shows: "Cafe Rio and Costa Vida",
    terms: ["tex mex", "texmex", "fake mexican", "sweet pork"],
    restaurants: ["cafe-rio", "costa-vida"],
    source: "CS S1 'Tex Mex' and S4 'Fake Mexican' piles held exactly Cafe Rio + Costa Vida (paired in 8/9 sorts); TT T10 Sav took Cafe Rio as 'close enough' to Costa Vida" },

  { id: "pizza", role: "what", shows: "Pizza",
    terms: ["pizza", "pizzas", "pizzeria", "pie", "wings", "slice"],
    tags: { category: ["pizza"] },
    source: "CS S3/S4/S9 'Pizza', S1 'Pizza + Hot Dogs'" },
  { id: "pasta", role: "what", shows: "Pasta",
    terms: ["pasta", "italian", "spaghetti", "noodles", "fettuccine", "alfredo", "lasagna", "penne", "breadsticks"],
    tags: { category: ["pasta"] },
    source: "TT notes: Katelyn expected a 'Pasta' category for Roni's Mac Bar; CS S5 Abbie's 'Italian' pile (Roni's, Brick Oven, Fat Daddy's)" },
  { id: "mac", role: "what", shows: "Mac and Cheese Places",
    terms: ["mac and cheese", "mac n cheese", "mac & cheese", "macaroni", "mac"],
    restaurants: ["ronis-mac-bar", "cubbys", "chick-fil-a"],
    source: "CS S4 Hannah's 'American? (Has Mac + Cheese)' pile: Cubby's, Chick-fil-A, Roni's Mac Bar" },

  { id: "dessert", role: "what", shows: "Dessert",
    terms: ["dessert", "desserts", "ice cream", "icecream", "scoop", "sweet", "sweets", "treat", "treats", "cookie", "cookies", "frozen", "sundae"],
    tags: { category: ["dessert"] },
    source: "CS S1/S4/S5/S9 'Ice Cream', S8 'Dessert'" },
  { id: "cone-shake", role: "what", shows: "Dessert, Plus Chick-fil-A",
    terms: ["cone", "cones", "milkshake", "milkshakes", "shake", "shakes", "malt"],
    tags: { category: ["dessert"] },
    restaurants: ["chick-fil-a"],
    source: "TT T7 'a cone or a milkshake'; Kathryn picked Chick-fil-A for it in under 4 seconds (it does serve both)" },

  { id: "breakfast", role: "what", shows: "Breakfast & Cafe",
    terms: ["breakfast", "brunch", "pancakes", "pancake", "waffles", "eggs", "cafe", "coffee", "bakery", "pastry", "pastries", "diner", "french toast", "kolache"],
    tags: { category: ["breakfast-cafe"] },
    source: "CS S4 'Breakfast/Brunch', S5 'Breakfast', S6/S9 'Cafe'" },
  { id: "hawaiian", role: "what", shows: "Hawaiian",
    terms: ["hawaiian", "polynesian", "island", "plate lunch", "kalua", "musubi", "poke", "luau"],
    tags: { category: ["hawaiian"] },
    source: "CS S1/S3/S4/S5 'Hawaiian', S9 'Asian/Hawaiian'" },

  // ---------------- Occasions: what (from Brinley's S2 sort and task wording) ----------------
  { id: "celebrate", role: "what", shows: "Places to Celebrate",
    terms: ["celebrate", "celebration", "celebrating", "special occasion", "anniversary", "birthday", "end of finals", "graduation"],
    tags: { dining: ["fine"] },
    restaurants: ["five-sushi-brothers", "thai-time", "brick-oven"],
    source: "CS S2 Brinley 'Places I'd go to celebrate something cool'; TT T4 'celebrate the end of finals', T6 'for a celebration'" },
  { id: "date", role: "what", shows: "Date Spots",
    terms: ["date", "first date", "date night", "date spot", "date idea"],
    restaurants: ["cubbys", "brookers", "j-dawgs", "don-joaquin", "byu-creamery", "purple-turtle"],
    source: "CS S2 'Places I've been on a date'; TT T7 'planning a first date' (cone or milkshake)" },
  { id: "group", role: "what", shows: "Places for a Group",
    terms: ["group", "friends", "roommates", "group of friends", "big group", "fhe", "family home evening", "ward activity", "party", "hangout"],
    restaurants: ["byu-creamery", "dennys", "panda-express", "chick-fil-a", "cafe-rio", "costa-vida", "chom-burger", "cupbop", "mo-bettahs"],
    source: "CS S2 'Places I'd go with a group of friends' + 'with a few friends'; TT T4 'college roommates', T8 'an FHE activity'" },
  { id: "local", role: "what", shows: "Local Favorites",
    terms: ["local", "local fav", "local favs", "local favorite", "local favorites", "locally owned"],
    restaurants: ["fat-daddys", "ronis-mac-bar", "byu-creamery", "brick-oven", "brookers"],
    source: "CS S6 Jocelyn's 'Local Favs' pile" },

  // ---------------- How you're served: narrow ----------------
  { id: "quick", role: "narrow", shows: "Fast Food or Counter Service",
    terms: ["quick", "quickly", "fast", "in a hurry", "on the go", "grab and go", "traveling", "travelling", "road trip", "quick stop", "quick bite"],
    tags: { dining: ["quick", "counter"] },
    source: "TT T3 'a quick restaurant to stop at while traveling' (correct = Quick & cheap or Counter service)" },
  { id: "fastfood", role: "narrow", shows: "Fast Food",
    terms: ["fast food", "drive thru", "drive through", "drivethru", "classic fast food", "quick and cheap", "quick cheap"],
    tags: { dining: ["quick"] },                       // [F1] points at the Fast Food dining category
    source: "CS S8 Hannah B split 'fast food' into counter service vs drive-thru; S9 'Classic Fast Food'" },
  { id: "counter", role: "narrow", shows: "Counter Service",
    terms: ["counter", "counter service", "order at the counter", "takeout", "take out", "to go"],
    tags: { dining: ["counter"] },
    source: "CS S8 'Counter Service'; TT notes: 5/8 found Roni's under Counter Service" },
  { id: "sitdown", role: "narrow", shows: "Sit-Down",
    terms: ["sit down", "sitdown", "served at a table", "at a table", "table service", "waiter", "waitress", "dine in"],
    tags: { dining: ["sit-down", "fine"] },
    source: "CS S8 'Sit-down', S6 'Sit down/nice'; TT T1 'be served at a table'" },
  { id: "fancy", role: "narrow", shows: "Fine Dining",
    terms: ["fancy", "fine dining", "upscale", "classy", "nice", "nice dinner", "elegant", "formal"],
    tags: { dining: ["fine"] },
    source: "TT T6 'a fancy restaurant'; CS S9 'Expensive/Fine Dining', S6 'Sit down/nice'" },

  // ---------------- Price: narrow ----------------
  { id: "cheap", role: "narrow", shows: "$ (under $12)",
    terms: ["cheap", "inexpensive", "budget", "affordable", "pay range", "in my pay range", "broke", "college budget", "low cost", "value", "cheapest"],
    tags: { price: ["1"] },
    source: "CS S7 Tia 'In my pay range'; TT T2 'cheap cheeseburger', T9 'You have $10'" },
  { id: "splurge", role: "narrow", shows: "$$ or $$$",
    terms: ["splurge", "treat myself", "just out of pay range", "mid range", "moderate"],
    tags: { price: ["2", "3"] },
    source: "CS S7 Tia 'Just out of pay range (splurge sometimes)'" },
  { id: "expensive", role: "narrow", shows: "$$$ (over $18)",
    terms: ["expensive", "pricey", "high end", "way out of pay range"],
    tags: { price: ["3"] },
    source: "CS S7 'WAY OUT of pay range', S9 'Expensive/Fine Dining'" },

  // ---------------- Places: narrow ----------------
  { id: "slc", role: "narrow", shows: "Salt Lake Area",
    terms: ["slc", "salt lake", "salt lake city", "sl", "downtown slc", "sugar house", "millcreek", "taylorsville", "sandy"],
    tags: { city: ["salt-lake"] },
    source: "TT T6 'a fancy restaurant in SLC'; 4/8 used the city filter for it, Sav missed it and chose Sundance" },
  { id: "provo", role: "narrow", shows: "Provo", terms: ["provo", "byu", "campus", "near campus"], tags: { city: ["provo"] },
    source: "Participants were BYU students (CS, TT participant tables)" },
  { id: "orem", role: "narrow", shows: "Orem", terms: ["orem", "uvu"], tags: { city: ["orem"] },
    source: "UVU participants Tia and Hannah B (CS S7, S8; TT P7)" },
  { id: "lehi", role: "narrow", shows: "Lehi", terms: ["lehi"], tags: { city: ["lehi"] }, source: "City filter value" },
  { id: "springville", role: "narrow", shows: "Springville", terms: ["springville"], tags: { city: ["springville"] }, source: "City filter value" },
  { id: "lindon", role: "narrow", shows: "Lindon", terms: ["lindon"], tags: { city: ["lindon"] }, source: "City filter value" },
  { id: "pg", role: "narrow", shows: "Pleasant Grove", terms: ["pleasant grove", "pg"], tags: { city: ["pleasant-grove"] }, source: "City filter value" },
  { id: "af", role: "narrow", shows: "American Fork", terms: ["american fork", "af"], tags: { city: ["american-fork"] }, source: "City filter value" },
  { id: "sundance", role: "narrow", shows: "Sundance", terms: ["sundance"], tags: { city: ["sundance"] }, source: "City filter value" }
];

/*
 * Dollar amounts ("$10", "15 dollars", "under 12 bucks") become a price
 * ceiling: every tier at or below that amount. Source: TT T1 "about $15
 * each", T2 "more than about $10", T9 "You have $10". TT notes: Audrey read
 * prices off the cards instead of filtering, so price must be searchable.
 */
window.PRICE_CEILINGS = [
  { upTo: 11.99, tiers: ["1"] },
  { upTo: 18,    tiers: ["1", "2"] },
  { upTo: Infinity, tiers: ["1", "2", "3"] }
];

/* Words ignored by the literal match (they carry no meaning on their own). */
window.STOP_WORDS = ("a an the and or of to for in on at by with from i im i'm we you my our me us want wants wanna " +
  "looking look find get go going need some something somewhere place places spot restaurant restaurants food eat eating " +
  "meal dinner lunch where whats what's good best near around about each spend like would could can should " +
  "that this is are be have has craving crave let lets let's please any kind type while when just really maybe tonight today after before then stop").split(" ");
