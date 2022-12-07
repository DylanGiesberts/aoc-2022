import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const crates = data.split("\n\n")[0].split("\n"),
            moves = data.split("\n\n")[1].split("\n");
        moves.pop();

        // Part 1
        let crateArray = [...Array(9)].map(x => []);
        const crateRegex = /\[[A-Z]\]/g;
        crates.forEach((row) => {
            const rowCrates = [...row.matchAll(crateRegex)];
            rowCrates.forEach((crate) => {
                crateArray[crate.index/4].splice(0, 0, crate[0])
            });
        });
        moves.forEach((row) => {
            const [ amount, oldIndex, newIndex ] = row.matchAll(/[0-9]+/g)
            for (let index = 0; index < amount[0]; index++) {
                let carry = crateArray[oldIndex[0]-1].pop();
                crateArray[newIndex[0]-1].push(carry);
            }
        });
        console.log(crateArray.map(x => x.pop()[1]).join(""));


        // Part 2
        crateArray = [...Array(9)].map(x => []);
        crates.forEach((row) => {
            const rowCrates = [...row.matchAll(crateRegex)];
            rowCrates.forEach((crate) => {
                crateArray[crate.index/4].splice(0, 0, crate[0])
            });
        });
        moves.forEach((row) => {
            const [ amount, oldIndex, newIndex ] = row.matchAll(/[0-9]+/g)
            let carry = crateArray[oldIndex[0]-1].splice(-amount[0]);
            crateArray[newIndex[0]-1] = crateArray[newIndex[0]-1].concat(carry);
        });
        console.log(crateArray.map(x => x.pop()[1]).join(""));
    }
    catch (err) {
        console.log(err);
    }
});