import fs from "fs";

const elfs = [[]]
const three = [0, 0, 0]

fs.readFile('input.txt', 'utf8', (err, data) => {
    try {
        let i = 0;
        const rows = data.split("\n");
        rows.forEach(row => {
            if (row == "") {
                elfs.push([]);
                i += 1;
            }
            else {
                elfs[i].push(parseInt(row));
            }
        });
        let highest = 0;
        elfs.forEach(calorieArray => {
            const elfTotal = calorieArray.reduce((partialSum, a) => partialSum + a, 0);
            if (elfTotal > highest) {
                highest = elfTotal;
            }
            if (elfTotal > Math.min(...three)) {
                three[three.indexOf(Math.min(...three))] = elfTotal
            }
        });
        console.log(highest);
        console.log(three.reduce((partialSum, a) => partialSum + a, 0));
    }
    catch (err) {
        console.log(err);
    }
})