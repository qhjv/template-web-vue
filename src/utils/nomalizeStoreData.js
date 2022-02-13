export default function normalize(data) {
  const ids = [];
  const byId = {};

  for (const item of data) {
    ids.push(item.id);
    byId[item.id] = item;
  }

  return {ids, byId};
}
