// src/data/loadItems.js
// Normalizes items data and exposes helpers for Map/Main/Rewards screens.

import itemsRaw from "./items";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Precomputed indexes */
const FLAT = [];
const BY_CHARACTER = {}; // { character: [items...] }
const BY_STAGE = {}; // { "CP1": [items...], "BQ3": [...], "STARTER": [...] }

(function build() {
  const raw = itemsRaw || {};
  Object.entries(raw).forEach(([character, slots]) => {
    Object.entries(slots || {}).forEach(([slot, arr]) => {
      (arr || []).forEach((it, idx) => {
        const id = `${character}-${slot}-${slugify(
          it.name || `${slot}-${idx}`
        )}`.toLowerCase();

        const normalized = {
          id,
          name: it.name || `${character} ${slot} ${idx + 1}`,
          image: it.image || "",
          slot, // e.g. helmet, cape, robe...
          character, // canonical name
          forCharacter: character, // alias some screens use
          rewardType: it.rewardType || "checkpoint", // "checkpoint"|"bigQuest"|"specialUnlock"
          rewardStage: it.rewardStage || "", // "CP1"|"BQ3"|"STARTER"|...
          starter: Boolean(it.starter),
        };

        FLAT.push(normalized);

        if (!BY_CHARACTER[character]) BY_CHARACTER[character] = [];
        BY_CHARACTER[character].push(normalized);

        const stage = normalized.rewardStage || "";
        if (!BY_STAGE[stage]) BY_STAGE[stage] = [];
        BY_STAGE[stage].push(normalized);
      });
    });
  });
})();

/** ---- Public API ---- */

/** All items (flat) */
export function getAllItems() {
  return FLAT.slice();
}

/** Items for a whole character */
export function getItemsForCharacter(character) {
  return (BY_CHARACTER[character] || []).slice();
}

/** Items tied to a reward stage (e.g., "CP3", "BQ10", "STARTER") */
export function getItemsForRewardStage(stage) {
  return (BY_STAGE[stage] || []).slice();
}

/** Starter items for a character */
export function getStarterItems(character) {
  return (BY_CHARACTER[character] || []).filter((it) => it.starter);
}

/** Reward icons above a checkpoint dot, filtered by character */
export function getRewardIconsFor(character, checkpointNumber) {
  const stage = `CP${Number(checkpointNumber)}`;
  const all = getItemsForRewardStage(stage);
  const filtered = all.filter(
    (it) => !it.forCharacter || it.forCharacter === character
  );
  return {
    items: filtered.map((it) => ({
      id: it.id,
      name: it.name,
      image: it.image,
      slot: it.slot,
    })),
  };
}

/** Convenience: preview what the next checkpoint will give */
export function getNextCheckpointRewards(character, nextCp) {
  return getRewardIconsFor(character, nextCp);
}
