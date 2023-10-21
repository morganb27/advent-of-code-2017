function spiralMemory(targetNumber) {
    const { ring, sideLength } = findRingAndSideLength(targetNumber);
    const midpoints = computeMidpoints(sideLength);
    const extraSteps = findClosestDistance(midpoints, targetNumber);
    return extraSteps + ring;
}

function findRingAndSideLength(targetNumber) {
    let ring = 0;
    let sideLength = 1;
    while (sideLength ** 2 < targetNumber) {
        ring++;
        sideLength+= 2;
    }
    return { ring, sideLength }
}
function computeMidpoints(sideLength) {
    let bottomMidpoint = sideLength ** 2 - (sideLength - 1) / 2;
    let midpoints = [bottomMidpoint];
    for (let i = 1; i < 4; i++) {
        midpoints.push(midpoints[i - 1] - sideLength + 1);
    }
    return midpoints;
}

function findClosestDistance(midpoints, targetNumber) {
    return  Math.min(...midpoints.map(midpoint => Math.abs(targetNumber - midpoint)));
}

console.log(spiralMemory(289326));