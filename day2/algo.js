const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split("\n");

    return lines.map(line => {
        const data = line.split(/\s+/).filter(Boolean);
        return data.map(Number);
    })
}

const file_path = 'input.txt';
const data = read_file(file_path);

function spreadsheetChecksum() {
    let sum = 0;
    for (let item of data) {
        const min = Math.min(...item);
        const max = Math.max(...item);
        const difference = max - min;
        sum += difference;
    }
    return sum
};

function spreadsheetChecksumSecondPart() {
    let sum = 0;
    for (let i =0; i<data.length;i++) {
        for (let j =0; j<data[i].length; j++) {
            for (let k =0; k<data[i].length; k++) {
                if (j !== k && data[i][j] % data[i][k] === 0) {
                    sum += data[i][j] / data[i][k]
                }
            }
        }
    }
    return sum
}

console.log(spreadsheetChecksum());
console.log(spreadsheetChecksumSecondPart());