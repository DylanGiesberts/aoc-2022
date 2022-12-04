import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n");
        rows.pop();

        // Part 1
        let count = 0;
        rows.forEach((row) => {
            const pairs = [ [parseInt(row.split(",")[0].split("-")[0]), parseInt(row.split(",")[0].split("-")[1]) ],
            [ parseInt(row.split(",")[1].split("-")[0]), parseInt(row.split(",")[1].split("-")[1]) ] ];
            if ((pairs[1][0] >= pairs[0][0] && pairs[1][1] <= pairs[0][1]) || (pairs[0][0] >= pairs[1][0] && pairs[0][1] <= pairs[1][1])) {
                count++;
            }
        });
        console.log(count);

        // Part 2
        count = 0;
        rows.forEach((row) => {
            const pairs = [ [parseInt(row.split(",")[0].split("-")[0]), parseInt(row.split(",")[0].split("-")[1]) ],
            [ parseInt(row.split(",")[1].split("-")[0]), parseInt(row.split(",")[1].split("-")[1]) ] ];
            if ( (pairs[0][0] >= pairs[1][0] && pairs[0][0] <= pairs[1][1]) ||
            (pairs[0][1] >= pairs[1][0] && pairs[0][1] <= pairs[1][1]) ||
            (pairs[1][0] >= pairs[0][0] && pairs[1][0] <= pairs[0][1]) ||
            (pairs[1][1] >= pairs[0][0] && pairs[1][1] <= pairs[0][1]) ) {
                count++;
            }
        });
        console.log(count);
    }
    catch (err) {
        console.log(err);
    }
});