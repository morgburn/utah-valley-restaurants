/*
 * TREE TEST TASKS: edit this file to change the tasks.
 * Source: "Treetest Tests" Google Sheet (spelling fixed). Tasks 1, 2 and 7 were
 * reworded so they don't quote the site's own labels.
 *
 *   id         stays fixed so results can be compared across participants
 *   text       exactly what the participant sees
 *   predicted  the first click you predicted before testing (for the report)
 *   target     the intended information block, if there is one (for the report)
 *
 * Task order is shuffled independently for every participant.
 */
window.TREETEST_TASKS = [
  { id: 1,  text: "Your family wants to be served at a table for a meal of pho or sushi, and you'd like to spend about $15 each.",
    predicted: "Asian", target: "Asian > Pho Plus" },
  { id: 2,  text: "You want a cheap cheeseburger and fries, and you don't want to spend more than about $10.",
    predicted: "Burgers & Grill", target: "" },
  { id: 3,  text: "You are looking for a quick restaurant to stop at while traveling.",
    predicted: "", target: "" },
  { id: 4,  text: "You and your college roommates are looking for a place to celebrate the end of finals.",
    predicted: "", target: "" },
  { id: 5,  text: "Find Roni's Mac Bar.",
    predicted: "", target: "Burgers & Grill > Roni's Mac Bar" },
  { id: 6,  text: "You are looking for a fancy restaurant in SLC to eat at for a celebration.",
    predicted: "", target: "" },
  { id: 7,  text: "You're planning a first date and want to end it with a cone or a milkshake.",
    predicted: "Desserts", target: "" },
  { id: 8,  text: "You are looking for a restaurant to eat at as an FHE activity.",
    predicted: "", target: "" },
  { id: 9,  text: "You have $10 and want to eat something for dinner.",
    predicted: "", target: "" },
  { id: 10, text: "You're craving Costa Vida.",
    predicted: "Mexican", target: "Mexican > Costa Vida" }
];
