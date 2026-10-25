const PALETTE = ["blue", "purple", "yellow", "green", "orange", "pink", "brown"];

/** Stable pastel colour for a tag label, so the same tech always gets the same colour. */
export function tagColor(label) {
  let hash = 0;
  for (const ch of label) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

/** Turns a list of labels into tags, showing at most `max` and a "+N" overflow tag. */
export function toTags(labels, max = 3) {
  const tags = labels.slice(0, max).map((label) => ({ label, color: tagColor(label) }));
  if (labels.length > max) tags.push({ label: `+${labels.length - max}`, color: "gray" });
  return tags;
}
