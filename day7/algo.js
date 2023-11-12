const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, "utf-8");
    const lines = content.split("\r\n");
    return lines;
}

function findBottomProgram() {
const formattedData = formatInputData(data);
const allChildren = new Set();
for (let program of formattedData.values()) {
    program.children.forEach(child => allChildren.add(child));
}
for (let program of formattedData.keys()) {
    if (!allChildren.has(program)) {
        console.log("Bottom program:", program)
        return program
    }
}
};

function formatInputData(data) {
    const formattedData = new Map();
    data.forEach( line => {
        const {programName, weight, children} = parseProgramLine(line);
        formattedData.set(programName, {weight: weight, children: children})
    })
    return formattedData;
}

function parseProgramLine(line) {
    let [leftPart, rightPart] = line.split(" -> ");
    let [programName, weight] = leftPart.split(" ");
    const children = rightPart ? rightPart.split(", ").map(s => s.trim()) : [];
    return {
        programName,
        weight: parseInt(weight.replace("(", "").replace(")", "")),
        children
    };   
}

function calculateTotalWeight(programName, formattedData) {
    const program = formattedData.get(programName);
    if (program.totalWeight) {
        return program.totalWeight;
    }
    let totalWeight = program.weight;
    program.children.forEach(childName => {
        const childWeight = calculateTotalWeight(childName, formattedData);
        totalWeight+= childWeight;
    })
    program.totalWeight = totalWeight;
    return totalWeight;
}

function findUnbalancedProgram(programName, formattedData) {
    const program = formattedData.get(programName);
    const weightMap = new Map();

    program.children.forEach(childName => {
        const childWeight = calculateTotalWeight(childName, formattedData);
        if (!weightMap.has(childWeight)) {
            weightMap.set(childWeight, []);
        }
        weightMap.get(childWeight).push(childName);
    });
    console.log("weightMap:", weightMap)

    if (weightMap.size > 1) {
        let unbalancedWeight, balancedWeight;

        for (let [weight, programs] of weightMap.entries()) {
            if (programs.length === 1) {
                unbalancedWeight = weight;
            } else {
                balancedWeight = weight;
            }
        }

        let unbalancedProgramName = weightMap.get(unbalancedWeight)[0];
        let weightDifference = balancedWeight - unbalancedWeight;

        console.log(`Checking deeper for: ${unbalancedProgramName}`);
        let deeperResult = findUnbalancedProgram(unbalancedProgramName, formattedData);
        if (deeperResult !== undefined) {
            console.log(`Deeper unbalance found: ${deeperResult}`);
            return deeperResult;
        } else {
            let unbalancedProgram = formattedData.get(unbalancedProgramName);
            let correctedWeight = unbalancedProgram.weight + weightDifference;
            console.log(`Corrected weight for ${unbalancedProgramName}: ${correctedWeight}`);
            return correctedWeight;
        }
    } else {
        console.log(`No imbalance found at ${programName}`);
        return null;
    }
}


    

let data = read_file("input.txt");
findBottomProgram(data);
const bottomProgramName = findBottomProgram(data);
const formattedData = formatInputData(data);
calculateTotalWeight(bottomProgramName, formattedData);
findUnbalancedProgram(bottomProgramName, formattedData);
