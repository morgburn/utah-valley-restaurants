/*
 * TREE TEST TASKS: edit this file to change the tasks.
 * Source: "Treetest Tests" Google Sheet (spelling fixed, wording unchanged).
 *
 *   id         stays fixed so results can be compared across participants
 *   text       exactly what the participant sees
 *   predicted  the first click you predicted before testing (for the report)
 *   target     the intended information block, if there is one (for the report)
 *
 * Task order is shuffled independently for every participant.
 */
window.TREETEST_TASKS = [
  { id: 1,  text: "You are looking for an Asian sit-down restaurant to eat with your family that is between $12 and $18.",
    predicted: "Asian", target: "Asian > Pho Plus" },
  { id: 2,  text: "Find a Burgers & Grill restaurant that is under $12.",
    predicted: "Burgers & Grill", target: "" },
  { id: 3,  text: "You are looking for a quick restaurant to stop at while traveling.",
    predicted: "", target: "" },
  { id: 4,  text: "You and your college roommates are looking for a place to celebrate the end of finals.",
    predicted: "", target: "" },
  { id: 5,  text: "Find Roni's Mac Bar.",
    predicted: "", target: "Burgers & Grill > Roni's Mac Bar" },
  { id: 6,  text: "You are looking for a fancy restaurant in SLC to eat at for a celebration.",
    predicted: "", target: "" },
  { id: 7,  text: "You are planning a first date and thinking about getting ice cream.",
    predicted: "Desserts", target: "" },
  { id: 8,  text: "You are looking for a restaurant to eat at as an FHE activity.",
    predicted: "", target: "" },
  { id: 9,  text: "You have $10 and want to eat something for dinner.",
    predicted: "", target: "" },
  { id: 10, text: "You're craving Costa Vida.",
    predicted: "Mexican", target: "Mexican > Costa Vida" }
];
