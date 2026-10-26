/*
 * ============================================================
 *  RESTAURANT DETAILS for the final prototype [F4].
 *  Real information, looked up October 2026 from each restaurant's
 *  own site where it had one, otherwise from listings (Restaurantji,
 *  Wheree, MapQuest, OpenTable, Yelp page titles).
 *  Hours change, so every restaurant page says when this was checked.
 *
 *  Shape of one entry (every field optional):
 *    website   "https://..."
 *    about     one or two sentences shown under the name
 *    known     what people order there (shown as "Known for")
 *    notes     practical tips (reservations, cash, age limits ...)
 *    locations [{ name, address, phone, hours: [["Mon–Sat", "11 am–9 pm"], ...] }]
 *              hours left out = "Call or check the website for hours"
 *    photo     a URL to a real photo of the restaurant. If it fails to
 *              load, the food stand-in from data.js is shown instead.
 *    photoCredit  who the photo belongs to (shown on the restaurant page)
 * ============================================================
 */
window.DETAILS = {
  // ---------- Asian ----------
  "five-sushi-brothers": {
    photo: "https://fivesushibrothers.com/wp-content/uploads/2019/01/5-Sushi-Brothers_0146-1.jpg",
    website: "https://fivesushibrothers.com/",
    about: "Late-night sushi bar near downtown Provo, open until midnight. Order at the counter or get it delivered.",
    known: ["Bandi roll", "Phat roll", "Lemon roll", "Gyoza"],
    notes: ["Closed between lunch and dinner (2–5 pm)."],
    locations: [{ address: "445 N Freedom Blvd, Provo, UT", phone: "(385) 549-4495",
      hours: [["Mon–Sat", "11 am–2 pm, 5 pm–12 am"], ["Sun", "Closed"]] }]
  },
  "thai-time": {
    photo: "https://www.thaitimeutah.com/assets/images/home-beef/about/food2.jpg",
    website: "https://www.thaitimeutah.com/",
    about: "Small Thai kitchen on Cougar Boulevard, a few minutes from BYU.",
    known: ["Pad thai", "Green curry", "Thai fried rice", "Tom kha soup"],
    notes: ["Closed between lunch and dinner (3–5 pm)."],
    locations: [{ address: "273 W Cougar Blvd, Provo, UT 84604", phone: "(385) 477-0308",
      hours: [["Mon–Sat", "11 am–3 pm, 5–9 pm"], ["Sun", "Closed"]] }]
  },
  "cupbop": {
    website: "https://www.cupbop.com/",
    about: "Utah-born Korean barbecue chain that started as a food truck. Meat, rice, noodles and sauce come in one cup.",
    known: ["Kko Kko chicken", "Krunchy chicken", "Bbop (beef)", "Spicy 7.5"],
    locations: [{ name: "Provo", address: "815 N 700 E, Provo, UT", phone: "(801) 607-5200",
      hours: [["Mon–Sat", "10:30 am–9 pm"], ["Sun", "Closed"]] },
      { name: "Salt Lake City", address: "45 E Broadway, Salt Lake City, UT" }]
  },
  "panda-express": {
    website: "https://www.pandaexpress.com/",
    about: "American Chinese fast food. Choose a bowl, plate or bigger plate and pick your entrées.",
    known: ["Orange chicken", "Beijing beef", "Chow mein", "Honey walnut shrimp"],
    locations: [
      { name: "Provo (University Ave)", address: "1240 N University Ave, Provo, UT 84604", phone: "(801) 818-0111",
        hours: [["Mon–Sat", "10 am–11:30 pm"], ["Sun", "10:30 am–10 pm"]] },
      { name: "Provo Towne Centre", address: "1200 Towne Centre Blvd #2072, Provo, UT 84601" },
      { name: "Orem", address: "494 E 1300 S, Orem, UT 84097" },
      { name: "Orem (UVU campus)", address: "800 W University Pkwy, Orem, UT 84058" }]
  },
  "pho-plus": {
    about: "Vietnamese noodle house on State Street in Orem, with big bowls of pho and banh mi.",
    known: ["Beef pho", "Shrimp pho", "Banh mi", "Spring rolls"],
    locations: [{ name: "Orem", address: "908 S State St, Orem, UT 84097", phone: "(801) 765-8808",
      hours: [["Mon–Sat", "11:30 am–9 pm"], ["Sun", "Closed"]] }]
  },
  "takashi": {
    photo: "https://images.squarespace-cdn.com/content/v1/604fa3dbdd2ca0380b4224f6/5efeda03-a9f2-4c4b-969e-7556f283017b/0782EE57-4F6E-49F6-A71B-02307E90DA25_1_201_a.jpeg",
    website: "http://takashisushi.com/",
    about: "One of Salt Lake City's best-known sushi restaurants, in the Exchange Place district downtown.",
    known: ["Saikyo-miso sablefish", "Yin-yang salmon", "Wagyu nikumaki", "Strawberry Fields roll"],
    notes: ["Lunch reservations are taken on a limited basis by phone. Otherwise expect a wait.", "Roughly $50–100 per person."],
    locations: [{ address: "18 W Market St, Salt Lake City, UT 84101", phone: "(801) 519-9595" }]
  },
  "tsunami-lehi": {
    photo: "https://popmenucloud.com/cdn-cgi/image/width=1200,height=1200,fit=scale-down,format=auto/ztoqjder/4d737e8e-a329-4f52-b812-137e3f9c3ea8.jpg",
    website: "https://www.tsunamiutah.com/traverse-mountain",
    about: "Sushi bar and Japanese fusion dining room with five Utah locations. The closest one is at Traverse Mountain in Lehi.",
    known: ["Tsunami roll", "Cococabana roll", "Baby back ribs", "Seared ahi salad"],
    notes: ["Reservations recommended. It fills up quickly."],
    locations: [{ name: "Lehi (Traverse Mountain)", address: "1616 W Traverse Pkwy, Lehi, UT 84043", phone: "(801) 770-0088",
      hours: [["Mon", "Closed"], ["Tue–Thu", "11 am–8:30 pm"], ["Fri", "11 am–9 pm"], ["Sat", "12–9 pm"], ["Sun", "3:30–8 pm"]] },
      { name: "Salt Lake area", address: "Sugar House, 9th & 9th, River Park and Union Heights" }]
  },

  // ---------- Burgers & Grill ----------
  "chom-burger": {
    photo: "https://videodelivery.net/2db584e019a5df1e841b955c5150facc/thumbnails/thumbnail.jpg",
    website: "https://www.chomburger.com/",
    about: "Local burger joint near downtown Provo. Order at the counter for smash burgers, fries and shakes.",
    known: ["Smash burgers", "Fries", "Shakes"],
    locations: [
      { name: "Provo", address: "45 W 300 N, Provo, UT 84601", phone: "(385) 241-7499",
        hours: [["Mon–Sat", "11 am–10 pm"], ["Sun", "Closed"]] },
      { name: "American Fork", address: "496 N 990 W, American Fork, UT 84003", phone: "(385) 498-3813",
        hours: [["Mon–Thu", "11 am–9 pm"], ["Fri–Sat", "11 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "seven-brothers": {
    website: "https://www.sevenbrothersburgers.com/",
    about: "Burger shop started by seven brothers on Oahu's North Shore, now at the Shops at Riverwoods in Provo.",
    known: ["Paniolo burger", "Max burger", "Shem burger", "Polynesian salad"],
    notes: ["Burgers run about $10–11."],
    locations: [{ name: "Provo (Riverwoods)", address: "4801 N University Ave, Provo, UT 84604",
      hours: [["Mon–Sat", "11 am–9 pm"], ["Sun", "Closed"]] }]
  },
  "j-dawgs": {
    photo: "https://images.getbento.com/accounts/51fc5bdd3fd51e19b501f74ad4a81a83/media/images/53739JDawgs_Home.jpg",
    website: "https://www.jdawgs.com/",
    about: "Provo hot dog stand that started in a tiny shack near BYU. Known for its secret sauce and quick lines.",
    known: ["Beef dog", "Polish dog", "Secret J Dawgs sauce", "Fries"],
    notes: ["Hot dogs about $6. Gluten-free buns on request."],
    locations: [{ name: "Provo", address: "858 N 700 E, Provo, UT 84606", phone: "(801) 852-2021",
      hours: [["Mon–Sat", "11 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "chick-fil-a": {
    photo: "https://static.cfacdn.com/photos/restaurants/03304/large.jpg",
    website: "https://www.chick-fil-a.com/",
    about: "Fast food chicken chain with a drive-thru, and breakfast in the mornings.",
    known: ["Chicken sandwich", "Nuggets", "Waffle fries", "Milkshakes"],
    locations: [{ name: "Provo (Cougar & State)", address: "484 W Cougar Blvd, Provo, UT 84604", phone: "(801) 374-2697",
      hours: [["Mon–Thu", "6:30 am–10 pm"], ["Fri–Sat", "6:30 am–11 pm"], ["Sun", "Closed"]] },
      { name: "BYU campus", address: "Cougareat food court, Wilkinson Student Center, Provo" }]
  },
  "rodizio": {
    photo: "https://www.rodiziogrill.com/provo-riverwoods/files/4428/BBQ_Fest_4.JPG",
    website: "https://www.rodiziogrill.com/provo-riverwoods/",
    about: "Brazilian steakhouse at Riverwoods. Gauchos bring more than a dozen grilled meats to your table and carve them there.",
    known: ["Full rodizio (unlimited meats)", "Gourmet salad bar", "Grilled pineapple", "Brazilian sides"],
    notes: ["Full rodizio: $29.99 at lunch, $37.99 at dinner.", "Reservations taken online."],
    locations: [{ name: "Provo (Riverwoods)", address: "4801 N University Ave #710, Provo, UT 84604", phone: "(801) 374-0100",
      hours: [["Mon–Thu", "Dinner 5–8 pm"], ["Fri–Sat", "Lunch 11:30 am–3 pm, dinner 3–9 pm"], ["Sun", "Closed"]] }]
  },
  "ronis-mac-bar": {
    photo: "https://www.ronismacbar.com/home-revamp/hero-food.jpg",
    website: "https://www.ronismacbar.com/",
    about: "Build-your-own mac and cheese bowls, started near BYU, with grill-style toppings like brisket and buffalo chicken.",
    known: ["Texas BBQ mac", "Chicken bacon ranch mac", "Buffalo chicken mac", "Grilled cheese"],
    locations: [{ name: "Provo", address: "42 E 1230 N, Provo, UT 84604", phone: "(801) 609-8814",
      hours: [["Mon–Fri", "11 am–10 pm"], ["Sat", "11 am–11 pm"], ["Sun", "Closed"]] }]
  },
  "cubbys": {
    website: "https://www.cubbys.co/",
    about: "Casual Utah chain for chargrilled burgers, Chicago-style beef sandwiches and big salads. Saturday mornings add breakfast.",
    known: ["Chicago-style beef sandwich", "Tri-tip sandwich", "Burgers", "Salads"],
    locations: [{ name: "Provo", address: "1258 N State St, Provo, UT", phone: "(801) 919-3023",
      hours: [["Mon–Thu", "11 am–8:30 pm"], ["Fri", "11 am–9:30 pm"], ["Sat", "8 am–9:30 pm (breakfast 8–11)"], ["Sun", "Closed"]] }]
  },
  "tucanos": {
    photo: "https://videodelivery.net/c41dca790f12353ea2ccf02f33776e2a/thumbnails/thumbnail.jpg",
    website: "https://www.tucanos.com/",
    about: "Brazilian churrascaria by University Mall. Grilled meats come to your table on skewers, with a salad and side bar.",
    known: ["Churrasco (unlimited grilled meats)", "Grilled pineapple", "Salad and side bar"],
    locations: [{ name: "Orem", address: "545 E University Pkwy, Orem, UT 84097", phone: "(801) 224-4774",
      hours: [["Mon–Wed", "11 am–10 pm"], ["Thu", "11 am–8 pm"], ["Fri–Sat", "11 am–11 pm"], ["Sun", "Closed"]] }]
  },
  "bam-bams-bbq": {
    photo: "https://www.bambamsbbq.com/wp-content/uploads/2014/06/homepage.jpg",
    website: "https://www.bambamsbbq.com/",
    about: "Orem barbecue joint. Order smoked meats at the counter.",
    known: ["Brisket", "Ribs", "Pulled pork"],
    locations: [{ name: "Orem", address: "1708 S State St, Orem, UT 84058", phone: "(801) 225-1324",
      hours: [["Mon–Sat", "11 am–9 pm"], ["Sun", "Closed"]] }]
  },
  "purple-turtle": {
    photo: "https://purpleturtlediner.com/wp-content/uploads/2025/07/purple-turtle-entrance960X540.avif",
    website: "https://purpleturtlediner.com/",
    about: "Old-school Pleasant Grove drive-in, famous for its fries and thick shakes.",
    known: ["Fries", "Pastrami burger", "Onion rings", "Peach cobbler shake"],
    locations: [{ name: "Pleasant Grove", address: "85 E State Rd, Pleasant Grove, UT", phone: "(801) 785-2444",
      hours: [["Mon", "10:30 am–6 pm"], ["Tue–Sat", "10:30 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "crown-burgers": {
    website: "https://www.crown-burgers.com/",
    about: "Salt Lake City chain founded in 1978, home of the Utah pastrami burger. It also serves Greek favorites like gyros.",
    known: ["Crown Burger (pastrami cheeseburger)", "Fry sauce", "Gyros", "Souvlaki"],
    locations: [
      { name: "Downtown Salt Lake City", address: "118 N 300 W, Salt Lake City, UT" },
      { name: "Salt Lake City (Highland Dr)", address: "3190 S Highland Dr, Salt Lake City, UT" },
      { name: "Salt Lake City (State St)", address: "3270 S State St, Salt Lake City, UT" },
      { name: "Sandy", address: "9604 S State St, Sandy, UT" }]
  },
  "log-haven": {
    photo: "https://log-haven.com/wp-content/uploads/2023/11/Pepper-Nix-Photography7.jpg",
    website: "https://log-haven.com/",
    about: "Fine dining in a 1920s log mansion four miles up Millcreek Canyon, with waterfalls and forest outside the windows.",
    known: ["Seasonal dinner menu", "Weekend brunch"],
    notes: ["Reservations required (phone or OpenTable).", "Parties of 7–12: call to reserve."],
    locations: [{ address: "6451 E Millcreek Canyon Rd, Salt Lake City, UT 84109", phone: "(801) 272-8255",
      hours: [["Mon–Fri", "Dinner 5–9 pm"], ["Sat–Sun", "Brunch 10 am–2 pm, dinner 5:30–9 pm"]] }]
  },
  "tree-room": {
    photo: "https://www.sundanceresort.com/site/assets/files/7258/tree-room-tables-26-sierra5_edit.2976x1600.jpg",
    website: "https://www.sundanceresort.com/dining/tree-room/",
    about: "Sundance Mountain Resort's signature restaurant, built around a living tree, serving seasonal American dishes from local ingredients.",
    known: ["Seasonal dinner menu", "Prix fixe menu", "Award-winning wine list"],
    notes: ["Reservations strongly recommended.", "No children under 12.", "Patio open in summer."],
    locations: [{ name: "Sundance Resort", address: "8841 N Alpine Loop Rd, Sundance, UT 84604", phone: "(801) 223-4200",
      hours: [["Tue–Sat", "5–9 pm"], ["Sun–Mon", "Closed"]] }]
  },

  // ---------- Mexican ----------
  "cafe-rio": {
    website: "https://www.caferio.com/",
    about: "Utah-born chain where burritos, salads and enchiladas are made down the line in front of you, on fresh flour tortillas.",
    known: ["Sweet pork salad", "Sweet pork burrito", "Fresh flour tortillas", "Grilled steak"],
    locations: [{ name: "South Provo", address: "1122 S University Ave, Provo, UT 84601", phone: "(801) 882-7995",
      hours: [["Mon–Wed, Sun", "10:30 am–10 pm"], ["Thu–Sat", "10:30 am–11 pm"]] }]
  },
  "costa-vida": {
    website: "https://www.costavida.com/",
    about: "Utah chain for baja-style burritos, salads and sweet pork, made fast at the counter.",
    known: ["Sweet pork salad", "Burritos", "Enchiladas", "Tacos"],
    locations: [
      { name: "Provo (BYU Campus Dr)", address: "1060 E Campus Dr, Provo, UT 84604", phone: "(801) 422-4134",
        hours: [["Mon–Fri", "10:30 am–9:30 pm"], ["Sat", "10:30 am–8 pm"], ["Sun", "Closed"]] },
      { name: "Provo (University Ave)", address: "1200 N University Ave, Provo, UT" },
      { name: "Orem (University Mall)", address: "557 E University Pkwy, Orem, UT" },
      { name: "Pleasant Grove", address: "881 W State St, Pleasant Grove, UT" },
      { name: "American Fork", address: "643 W Pacific Dr, American Fork, UT" },
      { name: "Lehi", address: "3750 N Thanksgiving Way, Lehi, UT" }]
  },
  "don-joaquin": {
    about: "Street taco shops with a self-serve salsa bar. The Provo location is open until midnight every day.",
    known: ["Carnitas gringa", "Pork tacos", "Lengua burrito", "Carne asada fries"],
    locations: [
      { name: "Provo", address: "150 W 1230 N, Provo, UT", phone: "(801) 400-2894",
        hours: [["Every day", "10 am–12 am"]] },
      { name: "Lindon", address: "131 S State St, Lindon, UT" },
      { name: "Springville", address: "615 N Main St, Springville, UT" }]
  },
  "the-taco-spot": {
    about: "Taco shop on Cougar Boulevard by BYU, with deals for students and late hours on weekends.",
    known: ["Street tacos", "Birria", "Quesadillas", "Loaded fries"],
    locations: [{ name: "Provo", address: "62 W Cougar Blvd, Provo, UT 84604",
      hours: [["Mon, Wed–Thu", "9 am–9 pm"], ["Tue, Fri–Sat", "9 am–11:30 pm"], ["Sun", "11 am–9 pm"]] }]
  },
  "taqueria-don-chuy": {
    photo: "https://taqueriadonchuy.com/pluto-videos/LoxMOa5pX2P7/22187b8ebb5de6e9cd15/poster.jpg",
    website: "https://taqueriadonchuy.com/",
    about: "Springville taqueria that opens at 6:30 am and serves breakfast burritos and chilaquiles all day.",
    known: ["Birria quesataco", "Carne asada plate", "Al pastor plate", "Breakfast burritos"],
    locations: [{ name: "Springville", address: "1851 W 500 S Ste C6, Springville, UT 84663", phone: "(801) 515-6146",
      hours: [["Mon–Thu", "6:30 am–11 pm"], ["Fri–Sat", "6:30 am–12 am"], ["Sun", "Closed"]] }]
  },
  "red-iguana": {
    website: "https://www.rediguana.com/",
    about: "Family-run Salt Lake City landmark since 1985, famous for its many kinds of mole.",
    known: ["Mole (several kinds)", "Enchiladas", "Chimichanga", "Combination plates"],
    notes: ["Expect a line at peak times. Takeout orders are available."],
    locations: [{ name: "Original (North Temple)", address: "736 W North Temple, Salt Lake City, UT 84116", phone: "(801) 322-1489" }]
  },
  "lone-star-taqueria": {
    photo: "https://lstaq.com/photos/patio.jpg",
    website: "https://www.lstaq.com/",
    about: "Casual taco stand in Cottonwood Heights known for fish tacos. It has a drive-thru and outdoor seating.",
    known: ["Fish tacos", "Carne asada tacos", "Fish burrito", "Tamales"],
    notes: ["About $10–20 per person."],
    locations: [{ name: "Cottonwood Heights", address: "2265 E Fort Union Blvd, Cottonwood Heights, UT 84121", phone: "(801) 944-2300",
      hours: [["Mon–Thu", "11 am–9 pm"], ["Fri–Sat", "11 am–10 pm"]] }]
  },

  // ---------- Pizza ----------
  "brick-oven": {
    photo: "https://static.spotapps.co/website_images/ab_websites/119111_website/video_poster.jpg",
    website: "https://brickovenrestaurants.com/",
    about: "Provo's pizza parlor since 1956, by BYU. Pizza and pasta are made from scratch daily, with soup, salad and pasta bars.",
    known: ["House-made root beer", "Romano-crust pizza", "Chicken fettuccine alfredo", "Chocolate mousse pie"],
    locations: [{ name: "Provo", address: "111 E 800 N, Provo, UT 84606", phone: "(801) 374-8800",
      hours: [["Mon–Thu", "11 am–9 pm"], ["Fri–Sat", "11 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "fat-daddys": {
    photo: "https://static.spotapps.co/new_website_videos/114786_videos/114786_video_desktop_v1.jpg",
    website: "https://fatdaddyspizzeria.com/",
    about: "Downtown Provo pizzeria on Center Street with big pies, wings and a dining room.",
    known: ["Pepperoni pizza", "Tri Carne pizza", "BBQ chicken pizza", "Margherita"],
    locations: [{ name: "Provo", address: "223 W Center St, Provo, UT 84601", phone: "(801) 377-4992",
      hours: [["Mon–Thu", "11 am–9 pm"], ["Fri–Sat", "11 am–10 pm"], ["Sun", "4–8 pm"]] }]
  },
  "pizzeria-712": {
    photo: "https://videodelivery.net/98b4338e273c86a6ce9d295a0aa1701a/thumbnails/thumbnail.jpg",
    website: "https://pizzeria712.com/",
    about: "Orem's wood-fired pizzeria. Seasonal Italian plates are made from local ingredients.",
    known: ["Serrano and sausage pizza", "Short rib appetizer", "Pesto pasta", "Peach cobbler"],
    locations: [{ name: "Orem", address: "320 S State St #185, Orem, UT", phone: "(801) 623-6712",
      hours: [["Every day", "11:30 am–9:30 pm"]] }]
  },
  "settebello": {
    photo: "https://images.squarespace-cdn.com/content/v1/5e8628fd2335d7362289654b/1587870862133-ME40RAPHYSNUZ492AUSD/IMG_8791+2.JPG",
    website: "https://settebello.net/",
    about: "Certified Neapolitan pizzeria in downtown Salt Lake. Pizzas bake in about 90 seconds in a wood-fired oven.",
    known: ["Neapolitan pizza", "Focaccia", "Caprese salad", "Arugula salad"],
    locations: [{ address: "260 S 200 W, Salt Lake City, UT 84101", phone: "(801) 322-3556" }]
  },

  // ---------- Pasta ----------
  "olive-garden": {
    website: "https://www.olivegarden.com/",
    about: "Italian-American chain. Every entrée comes with unlimited soup or salad and breadsticks.",
    known: ["Chicken alfredo", "Unlimited breadsticks", "Soup or salad", "Zeppoli (Italian doughnuts)"],
    locations: [{ name: "American Fork", address: "538 W Main St, American Fork, UT 84003", phone: "(801) 763-7229",
      hours: [["Mon–Thu, Sun", "11 am–10 pm"], ["Fri–Sat", "11 am–11 pm"]] }]
  },
  "old-spaghetti-factory": {
    photo: "https://www.osf.com/wp-content/uploads/2018/10/Salt-Lake-City.jpg",
    website: "https://www.osf.com/location/salt-lake-city-ut/",
    about: "Classic spaghetti house in Trolley Square. Every entrée comes with sourdough bread, soup or salad, and ice cream.",
    known: ["Spaghetti and meatballs", "Chicken piccata", "Sourdough bread", "Spumoni ice cream"],
    notes: ["Usually $30 and under per person."],
    locations: [{ name: "Trolley Square", address: "189 Trolley Square, Salt Lake City, UT 84102", phone: "(801) 521-0424",
      hours: [["Mon–Thu", "11:30 am–9:30 pm"], ["Fri", "11:30 am–10 pm"], ["Sat", "12–10 pm"], ["Sun", "12–9 pm"]] }]
  },

  // ---------- Dessert ----------
  "byu-creamery": {
    about: "BYU's campus ice cream shop and grill, with BYU Creamery ice cream plus cheap burgers and fries.",
    known: ["Ernestly Chocolate ice cream", "Shakes", "Bacon burger", "Onion rings"],
    locations: [{ name: "Provo", address: "1209 N 900 E, Provo, UT 84604", phone: "(801) 422-2663",
      hours: [["Mon–Thu", "7 am–10 pm"], ["Fri–Sat", "7 am–11 pm"], ["Sun", "Closed"]] }]
  },
  "brookers": {
    photo: "https://brookersicecream.com/wp-content/uploads/0V9A4237-3.jpg",
    website: "https://brookersicecream.com/",
    about: "Ice cream shop with an American history theme. It has 13 drinking chocolates, one for each original colony.",
    known: ["Rotating ice cream flavors", "Shakes", "Drinking chocolate"],
    locations: [
      { name: "Provo", address: "748 E 820 N, Provo, UT 84606", phone: "(801) 919-4635",
        hours: [["Mon–Sat", "11 am–11 pm"], ["Sun", "11 am–10 pm"]] },
      { name: "Also in", address: "Lehi, Vineyard, Saratoga Springs, Spanish Fork, Draper and Fort Union" }]
  },
  "crumbl": {
    website: "https://crumblcookies.com/",
    about: "Utah-born cookie chain with a menu of giant cookies that changes every week.",
    known: ["Milk chocolate chip", "Weekly rotating flavors"],
    locations: [{ name: "Provo", address: "154 W 1230 N, Provo, UT", phone: "(801) 823-1544",
      hours: [["Mon–Thu", "8 am–10 pm"], ["Fri–Sat", "8 am–12 am"], ["Sun", "Closed"]] }]
  },

  // ---------- Breakfast & Cafe ----------
  "dennys": {
    website: "https://www.dennys.com/",
    about: "All-day breakfast diner. The Utah County locations listed here are open 24 hours.",
    known: ["Grand Slam", "Pancakes", "Moons Over My Hammy"],
    locations: [
      { name: "Provo", address: "1680 N 200 W, Provo, UT 84604", phone: "(801) 375-8362", hours: [["Every day", "Open 24 hours"]] },
      { name: "Orem", address: "485 N State St, Orem, UT 84057", phone: "(801) 765-0519", hours: [["Every day", "Open 24 hours"]] },
      { name: "Lehi", address: "101 N 1200 E, Lehi, UT 84043", phone: "(801) 766-9129", hours: [["Every day", "Open 24 hours"]] }]
  },
  "the-brunch-house": {
    about: "Busy Provo brunch spot, open every day including Sunday. Expect a wait on weekends.",
    known: ["Chilaquiles", "French toast", "Monte Cristo", "Corned beef hash"],
    locations: [{ name: "Provo", address: "1145 N 500 W, Provo, UT 84604", phone: "(385) 223-8953",
      hours: [["Every day", "8 am–2 pm"]] }]
  },
  "gurus-cafe": {
    about: "Laid-back downtown Provo cafe on Center Street with rice bowls, wraps, salads and sweet potato fries.",
    known: ["Guru salad", "Rice bowls", "Sweet potato fries", "Wraps"],
    locations: [{ name: "Provo", address: "45 E Center St, Provo, UT 84606", phone: "(801) 375-4878",
      hours: [["Mon–Wed", "8 am–9 pm"], ["Thu", "9 am–9 pm"], ["Fri–Sat", "8 am–10 pm"], ["Sun", "9 am–2 pm"]] }]
  },
  "kitchen-eighty-eight": {
    about: "American Fork grill that started as a food truck. It's known for tri-tip with peri peri and chimichurri, and for its burgers.",
    known: ["Grilled tri-tip with peri peri and chimichurri", "Classic burger", "Fries"],
    locations: [
      { name: "American Fork", address: "513 S 500 E Ste B, American Fork, UT", phone: "(801) 980-2021",
        hours: [["Mon–Sat", "11 am–9 pm"], ["Sun", "Closed"]] },
      { name: "Kaysville", address: "260 W 200 N, Kaysville, UT" }]
  },
  "kneaders": {
    website: "https://www.kneaders.com/",
    about: "Utah bakery-cafe chain for sandwiches on fresh bread, soups and pastries, and all-you-can-eat French toast.",
    known: ["French toast", "Turkey bacon avocado sandwich", "Tomato soup", "Pastries"],
    locations: [
      { name: "Provo (1230 N)", address: "295 W 1230 N, Provo, UT", phone: "(801) 812-2200",
        hours: [["Mon–Sat", "7 am–9 pm"], ["Sun", "Closed"]] },
      { name: "Provo (Riverwoods)", address: "4833 N Edgewood Dr, Provo, UT" }]
  },
  "ruths-diner": {
    photo: "https://ruthsdiner.com/wp-content/uploads/2021/05/old-diner.jpg",
    website: "https://ruthsdiner.com/",
    about: "Canyon diner in Emigration Canyon, open since 1930 and partly housed in an old trolley car. Known for big breakfasts.",
    known: ["Biscuits and gravy", "Mile-high biscuits", "Hash browns"],
    locations: [{ name: "Emigration Canyon", address: "4160 Emigration Canyon Rd, Salt Lake City, UT 84108", phone: "(801) 582-5807",
      hours: [["Thu–Mon", "8 am–9 pm (Fri–Sat until 10 pm)"], ["Tue–Wed", "Closed"]] }]
  },
  "the-kolache-place": {
    photo: "https://static.wixstatic.com/media/760138_e2451219a87c400d87211d840ea7285e~mv2.jpg",
    website: "https://www.thekolacheplace.com/",
    about: "Morning bakery for sweet and savory kolaches. Grab and go until they sell out.",
    known: ["Sausage and cheese kolache", "Fruit kolaches"],
    notes: ["Open 6:30 am–1 pm, or until sold out."],
    locations: [
      { name: "Provo", address: "434 W Center St, Provo, UT 84601", phone: "(801) 623-3578",
        hours: [["Mon–Sat", "6:30 am–1 pm"], ["Sun", "Closed"]] },
      { name: "Orem", address: "556 S State St, Orem, UT 84058", phone: "(385) 799-1599",
        hours: [["Mon–Sat", "6:30 am–1 pm"], ["Sun", "Closed"]] },
      { name: "American Fork", address: "11 W Main St, American Fork, UT 84003", phone: "(385) 455-3282",
        hours: [["Mon–Sat", "6:30 am–1 pm"], ["Sun", "Closed"]] },
      { name: "Salt Lake City (Sugar House)", address: "1751 S 1100 E, Salt Lake City, UT 84105", phone: "(385) 309-4379" }]
  },

  // ---------- Hawaiian ----------
  "mo-bettahs": {
    photo: "https://i0.wp.com/mobettahs.com/wp-content/uploads/2026/02/A-Taste-of-Home-Photo-Desktop-1.png",
    website: "https://www.mobettahs.com/",
    about: "Utah-born chain for Hawaiian plate lunches: teriyaki or kalua pork with rice and mac salad.",
    known: ["Teriyaki chicken plate", "Katsu chicken", "Kalua pork", "Mac salad"],
    locations: [{ name: "Provo", address: "442 N 900 E, Provo, UT 84606", phone: "(801) 784-6421",
      hours: [["Mon–Sat", "10:30 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "hungry-hawaiian": {
    photo: "https://static-content.owner.com/funnel/images/14b28465-b086-4445-8fa8-076cac959b84",
    website: "https://hungryhawaiian.com/",
    about: "Downtown Provo spot for Hawaiian plates made to order, plus malasadas for dessert.",
    known: ["Lau lau plate", "Loco moco", "Poke bowl", "Malasadas with guava sauce"],
    locations: [{ name: "Provo", address: "180 N University Ave Ste 135, Provo, UT 84601", phone: "(801) 607-1927",
      hours: [["Mon–Thu", "11 am–9 pm"], ["Fri–Sat", "11 am–10 pm"], ["Sun", "Closed"]] }]
  },
  "leilanis": {
    photo: "https://static-content.owner.com/funnel/images/2e4e72c4-583a-45d7-ace5-f0bcc4880a37",
    website: "https://leilanispolynesianplace.com/",
    about: "Polynesian plates in Lindon, including Tongan and Samoan favorites.",
    known: ["Poly combo plate", "Ota ika (raw fish)", "Lu pulu", "Sapasui"],
    locations: [{ name: "Lindon", address: "135 S State St #8, Lindon, UT 84042", phone: "(801) 785-4338",
      hours: [["Mon–Sat", "11 am–7 pm"], ["Sun", "Closed"]] }]
  },
  "buddas-bakery": {
    about: "Hawaiian-style bakery and breakfast spot in Pleasant Grove. Order at the counter.",
    known: ["Coconut bread", "Spam fried rice", "Bulgogi bento", "Sticky budda roll"],
    locations: [{ name: "Pleasant Grove", address: "205 E 700 S, Pleasant Grove, UT 84062", phone: "(801) 701-0617",
      hours: [["Mon–Sat", "8 am–8 pm"], ["Sun", "8 am–2 pm"]] }]
  }
};
window.DETAILS_CHECKED = "October 2026";
