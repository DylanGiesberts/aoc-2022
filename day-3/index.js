import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n");
        rows.pop();

        // Part 1
        let sum = 0;
        rows.forEach((rucksack) => {
            const compartments = [rucksack.substring(0, rucksack.length/2).split(""), rucksack.slice(rucksack.length/2).split("")];
            const duplicates = [...new Set(compartments[0].filter(value => compartments[1].includes(value)))];
            duplicates.forEach((item) => {
                if (item == item.toLowerCase()) {
                    sum += item.charCodeAt()-96;
                }
                else {
                    sum += item.charCodeAt()-64+26;
                }
            });
        });
        console.log(sum);

        let i = 0;
        let groups = [];
        sum = 0;
        rows.forEach((rucksack) => {
            if (groups[Math.floor(i/3)] == undefined) {
                groups.splice(i,0,[]);
            }
            groups[Math.floor(i/3)].push(rucksack);
            i++;
        });
        groups.forEach((group) => {
            const badge = [...new Set(group[0].split("").filter(v => group[1].split("").includes(v)).filter(v => group[2].split("").includes(v)))];
            if (badge[0] == badge[0].toLowerCase()) {
                sum += badge[0].charCodeAt()-96;
            }
            else {
                sum += badge[0].charCodeAt()-64+26;
            }
        });
        console.log(sum);
    }
    catch (err) {
        console.log(err);
    }
});