const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, "utf-8");
    const lines = content.split("\n").map(Number);
    return lines;
}

const file_path = "input.txt"
const data = read_file(file_path);

function calculateNumberOfStepsToExitMaze() {
    let numberOfSteps = 0;
    for (let i = 0; i < data.length; i += data[i] - 1) {
        data[i]++;
        numberOfSteps++;
    }
    return numberOfSteps;
}

function calculateNumberOfStepsToExitMazePartTwo() {
    let numberOfSteps = 0;
    let i = 0;
    while (i < data.length) {
        const jump = data[i];
        data[i] >= 3 ? data[i]-- : data[i]++;
        i += jump;
        numberOfSteps++;
    }
    return numberOfSteps;
}

console.log(calculateNumberOfStepsToExitMaze());
console.log(calculateNumberOfStepsToExitMazePartTwo());
