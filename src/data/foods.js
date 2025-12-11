// src/data/foods.js
// Minimal, extend anytime. All names lowercase.
export const FOOD_DB = [
  // water
  { patterns: ["water", "water 250", "250ml water"], tags: ["water"], ml: 250 },
  { patterns: ["water 300", "300ml water"], tags: ["water"], ml: 300 },
  {
    patterns: ["water 500", "500ml water", "bottle of water"],
    tags: ["water"],
    ml: 500,
  },

  // fruit (each counts ~1 serving)
  { patterns: ["apple", "apples"], tags: ["fruit"], servings: 1 },
  { patterns: ["banana", "bananas"], tags: ["fruit"], servings: 1 },
  {
    patterns: ["orange", "oranges", "mandarin", "clementine"],
    tags: ["fruit"],
    servings: 1,
  },
  { patterns: ["strawberry", "strawberries"], tags: ["fruit"], servings: 1 },
  { patterns: ["blueberries", "blueberry"], tags: ["fruit"], servings: 1 },
  { patterns: ["grapes", "grape"], tags: ["fruit"], servings: 1 },
  { patterns: ["pear", "pears"], tags: ["fruit"], servings: 1 },
  { patterns: ["kiwi", "kiwis"], tags: ["fruit"], servings: 1 },

  // veg (each counts ~1 serving)
  {
    patterns: ["carrot", "carrots", "carrot sticks"],
    tags: ["veg"],
    servings: 1,
  },
  { patterns: ["cucumber", "cucumbers"], tags: ["veg"], servings: 1 },
  { patterns: ["broccoli"], tags: ["veg"], servings: 1 },
  { patterns: ["peas"], tags: ["veg"], servings: 1 },
  {
    patterns: ["tomato", "tomatoes", "cherry tomatoes"],
    tags: ["veg"],
    servings: 1,
  },
  {
    patterns: ["pepper", "bell pepper", "red pepper", "yellow pepper"],
    tags: ["veg"],
    servings: 1,
  },

  // extras (can extend for future quests)
  { patterns: ["milk"], tags: ["dairy"] },
  { patterns: ["yogurt", "yoghurt"], tags: ["protein", "dairy"] },
  { patterns: ["eggs", "egg"], tags: ["protein"] },
  { patterns: ["oatmeal", "porridge"], tags: ["grain"] },
  { patterns: ["rice", "brown rice"], tags: ["grain"] },
  {
    patterns: ["toast", "whole wheat toast", "wholegrain bread"],
    tags: ["grain"],
  },
];

/** Classify a free-text entry into tags + amounts (very light fuzzy match). */
export function classifyFood(text) {
  const q = String(text || "")
    .trim()
    .toLowerCase();
  if (!q) return null;

  // try exact-ish contains
  for (const row of FOOD_DB) {
    for (const p of row.patterns) {
      if (q.includes(p)) {
        return {
          name: text,
          tags: row.tags.slice(),
          servings: row.servings || 0,
          ml: row.ml || 0,
        };
      }
    }
  }

  // last-resort heuristics
  if (q.includes("water")) {
    const ml = /\b(\d{2,4})\s?ml\b/.exec(q)?.[1];
    return {
      name: text,
      tags: ["water"],
      servings: 0,
      ml: ml ? Number(ml) : 250,
    };
  }
  return { name: text, tags: [], servings: 0, ml: 0 };
}
