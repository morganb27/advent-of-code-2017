const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = [...content.trim()].map(Number);
    return lines
}

const file_path = 'input.txt';
const data = read_file(file_path);

function solveCaptchaFirstPart() {
    let sum = 0;
    for (let i=0; i<data.length; i++) {
        if (i === data.length - 1) {
            if (data[i] === data[0]) {
                sum += data[i]
            }
        }
        else if (data[i] === data[i+1]) {
            sum += data[i]
        }
    }
    return sum
};

function solveCaptchaSecondPart() {
    let sum = 0;
    let indexToCheck = data.length / 2;
    console.log("index to check: ", indexToCheck);
    for (let i = 0; i<data.length; i++) {
        if (i >= indexToCheck) {
            if (data[i] === data[i - indexToCheck]) {
                sum += data[i]
            }
        }
        else if (data[i] === data[i + indexToCheck]) {
            sum += data[i]
        }
    }
    return sum
}

console.log(solveCaptchaFirstPart());
console.log(solveCaptchaSecondPart());