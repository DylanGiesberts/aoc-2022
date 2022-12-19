import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n");
        rows.pop();

        // Part 1;
        let cycle = 0,
            strength = 1,
            sum = 0;
        rows.forEach((row) => {
            if (row == "noop") {
                cycle++;
            }
            else {
                const amount = parseInt(row.split(" ")[1]);
                cycle++;
                if (cycle % 40 == 19) {
                    sum += (cycle+1) * strength;
                }
                strength += amount;
                cycle++;
            }
            if (cycle % 40 == 19) {
                sum += (cycle+1) * strength;
            }
        });
        console.log(sum);

        // Part 2
        cycle = 0;
        strength = 1;
        let crt = [[],[],[],[],[],[]];
        rows.forEach((row) => {
            if (cycle % 40 == strength - 1 || cycle % 40 == strength || cycle % 40 == strength + 1) {
                crt[Math.floor(cycle/40)].push("#");
            }
            else {
                crt[Math.floor(cycle/40)].push(".");
            }
            if (row == "noop") {
                cycle++;
            }
            else {
                cycle++;
                if (cycle % 40 == strength - 1 || cycle % 40 == strength || cycle % 40 == strength + 1) {
                    crt[Math.floor(cycle/40)].push("#")
                }
                else {
                    crt[Math.floor(cycle/40)].push(".")
                }
                cycle++;
                const amount = parseInt(row.split(" ")[1]);
                strength += amount;
            }
        });
        crt.forEach(line => console.log(JSON.stringify(line)));
    }
    catch (err) {
        console.log(err);
    }
});