const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, "utf-8");
    const lines = content.split("\r\n");
    return lines;
}

const data = read_file("input.txt");
const registers = new Map();
const operations = {
    "inc": (a, b) => a + b,
    "dec": (a, b) => a - b
}
const comparisons = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "!=": (a, b) => a != b,
    "==": (a, b) => a == b,
}

function findLargestValue() {
    const parsedData = parseInput(data);
    console.log(parsedData);
    let higestValueHeldInRegisters = -Infinity;
    let currentHighestValue = - Infinity;
    parsedData.forEach(line => {
        computeInput(line);
        currentHighestValue = Math.max(...registers.values());
        if (currentHighestValue > higestValueHeldInRegisters) {
            higestValueHeldInRegisters = currentHighestValue;
        }
    })
    console.log(higestValueHeldInRegisters);
    return Math.max(...registers.values())
}

function parseInput(array) {
    const parsedLines = [];
    array.forEach(line => {
        const [instruction, condition] = line.split("if ");
        const [register, operation, value] = instruction.split(" ");
        const [condRegister, condOperation, condValue] = condition.split(" ");
        const numericValue = parseInt(value, 10);
        const numericCondValue = parseInt(condValue, 10);
        parsedLines.push({ register, operation, value: numericValue, condRegister, condOperation, condValue: numericCondValue });    
    });
    return parsedLines;
};

function computeInput(object) {
    if (!registers.has(object.register)) {
        registers.set(object.register, 0)
    }
    if (!registers.has(object.condRegister)) {
        registers.set(object.condRegister, 0)
    }

    console.log(object)
    if (comparisons[object.condOperation](registers.get(object.condRegister), object.condValue)) {
        registers.set(object.register, operations[object.operation](registers.get(object.register), object.value))
    }
}

console.log(findLargestValue());
