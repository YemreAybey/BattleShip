const ship = size => {
  const loc = [];
  let hits = 0;

  const hitShow = () => {
    return hits;
  };
  const isSunk = () => {
    return hits >= size;
  };

  const hit = () => {
    if (!isSunk()) {
      hits += 1;
    }
  };
  return { size, loc, hits, isSunk, hit, hitShow };
};

export default ship;
