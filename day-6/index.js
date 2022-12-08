import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        // Part 1
        let input = data.split(""),
            start = [],
            four = [],
            found = false;
        while (!found) {
            start.push(input.shift());
            four = start.slice(-4);
            if (four.length == new Set(four).size && four.length == 4) {
                found = true;
            }
        }
        console.log(start.length);

        // Part 2
        input = data.split(""),
        start = [],
        found = false;
        let fourteen = [];
        while (!found) {
            start.push(input.shift());
            fourteen = start.slice(-14);
            if (fourteen.length == new Set(fourteen).size && fourteen.length == 14) {
                found = true;
            }
        }
        console.log(start.length);
    }
    catch (err) {
        console.log(err);
    }
});