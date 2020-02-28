export const findTreesWithinAMile = (treeData, currentCoords) => (
  Object.keys(treeData).reduce((_accumulator, treeId) => {
    const accumulator = _accumulator;
    const tree = treeData[treeId];
    const treeCoords = { lat: tree.geometry.coordinates[1], lng: tree.geometry.coordinates[0] };
    mathForTreesWithinAMile(treeCoords, currentCoords) && accumulator.push(tree);
    return accumulator;
  }, []));

const mathForTreesWithinAMile = (checkTree, centerPoint) => {
  const mile = 1.60934;
  const ky = 40000 / 360;
  const kx = Math.cos(Math.PI * centerPoint[1] / 180.0) * ky;
  const dx = Math.abs(centerPoint[0] - checkTree.lng) * kx;
  const dy = Math.abs(centerPoint[1] - checkTree.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= mile;
};

export const countOccuranceByKey = (array, key) => count(array, item => item.properties[key.property]);

const count = (array, key) => {
  const aggregate = array.reduce((counter, tree) => {
    const prop = key(tree);
    counter[prop] = counter.hasOwnProperty(prop) ? counter[prop] + 1 : 1;
    return counter;
  }, {});

  const arrayOfType = Object.keys(aggregate).map((key) => {
    const value = aggregate[key];
    return { name: key, count: value };
  });
  return arrayOfType;
};  