const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split("\n");

    return lines.map(line => {
        const data = line.split(/\s+/).filter(Boolean);
        return data.map(String);
    })
}

const file_path = 'input.txt';
const data = read_file(file_path);

function countValidPassphrases() {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        let uniqueStrings = new Set();
        for (let j = 0; j < data[i].length; j++) {
            uniqueStrings.add(data[i][j]);
        }
        if (data[i].length === uniqueStrings.size) {
            count++
        }
    }
    return count;
}

function countSecuredValidPassphrases() {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        let uniqueStrings = new Set();
        let isAnagram = false;
        for (let j = 0; j < data[i].length; j++) {
            uniqueStrings.add(sortString(data[i][j]));
        }
        if (data[i].length === uniqueStrings.size) {
            count++
        }
    }
    return count;
}

function sortString(str) {
    return str.split("").sort().join("");

}

console.log(countValidPassphrases());
console.log(countSecuredValidPassphrases());