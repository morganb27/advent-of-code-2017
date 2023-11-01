const fs = require ('fs');

function read_file(file_path) {
    const content =  fs.readFileSync(file_path, "utf-8");
    const lines = content.split("\n").map(Number);
    return lines;
}

let data = read_file("input.txt");


function calculateRedistributionCycles() {
    const setOfUniqueStates = new Set();
    let isSeenBefore = false;
    let count = 0;
    while (!isSeenBefore) {
        const cycle = redistributeBlocksFromBank(data);
        isSeenBefore = isStateSeenBefore(cycle, setOfUniqueStates);
        data = cycle;
        count++
    }
    console.log(data);
    return count;
};

function calculateSizeOfLoop() {
    const statesMap = new Map();
    let count = 0;

    while (true) {
        const stateToString = data.join(",");
        if (statesMap.has(stateToString)) {
            return count - statesMap.get(stateToString);
        }
        statesMap.set(stateToString, count);
        data = redistributeBlocksFromBank(data);
        count++
    }




}

function redistributeBlocksFromBank(array) {
    const max = Math.max(...array);
    let count = 0;
    let indexOfMax = array.indexOf(max);
    array[indexOfMax] = 0;
    for (let i = (indexOfMax + 1) % array.length; count < max; i = (i + 1) % array.length) {
        array[i]++;
        count++;
    }
    return array
}

function isStateSeenBefore(array,setOfUniqueStates) {
    const originalSize = setOfUniqueStates.size;
    setOfUniqueStates.add(array.join(" "));
    return originalSize === setOfUniqueStates.size;
}

//console.log(calculateRedistributionCycles());
console.log(calculateSizeOfLoop());
