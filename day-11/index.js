import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        // Part 1
        let monkeys = []
        data.split("\n\n").forEach((monkey, index) => {
            const rows = monkey.split("\n");
            monkeys[index] = {
                "id": parseInt(rows[0].split(" ")[1][0]),
                "items": rows[1].split(" ").slice(4).map(item => parseInt(item)),
                "operation": rows[2].split(" ").slice(5).join(""),
                "test": parseInt(rows[3].split(" ")[5]),
                "true": parseInt(rows[4].split(" ")[9]),
                "false": parseInt(rows[5].split(" ")[9]),
                "count": 0
            }
        });
        for (let i = 0; i < 20; i++) {
            monkeys.forEach((monkey) => {
                monkey.items.forEach((item, index) => {
                    const old = item;
                    item = Math.floor(eval(monkey.operation)/3);
                    monkeys[monkey.id].items[index] = item;
                    if (item % monkey.test == 0) {
                        monkeys[monkey.true].items.push(monkeys[monkey.id].items[index]);
                    }
                    else {
                        monkeys[monkey.false].items.push(monkeys[monkey.id].items[index]);
                    }
                    monkey.count++;
                });
                monkey.items = []
            });
        }
        let counts = monkeys.map(monkey => monkey.count)
        console.log(counts.splice(counts.indexOf(Math.max(...counts)), 1)[0] * Math.max(...counts));


        // Part 2
        monkeys = []
        data.split("\n\n").forEach((monkey, index) => {
            const rows = monkey.split("\n");
            monkeys[index] = {
                "id": parseInt(rows[0].split(" ")[1][0]),
                "items": rows[1].split(" ").slice(4).map(item => parseInt(item)),
                "operation": rows[2].split(" ").slice(5).join(""),
                "test": parseInt(rows[3].split(" ")[5]),
                "true": parseInt(rows[4].split(" ")[9]),
                "false": parseInt(rows[5].split(" ")[9]),
                "count": 0
            }
        });
        const supermod = monkeys.map(monkey => monkey.test).reduce((a, b) => a * b);
        for (let i = 0; i < 10000; i++) {
            monkeys.forEach((monkey) => {
                monkey.items.forEach((item, index) => {
                    const old = item;
                    item = eval(monkey.operation) % supermod;
                    monkeys[monkey.id].items[index] = item;
                    if (item % monkey.test == 0) {
                        monkeys[monkey.true].items.push(item);
                    }
                    else {
                        monkeys[monkey.false].items.push(item);
                    }
                    monkey.count++;
                });
                monkey.items = []
            });
        }
        counts = monkeys.map(monkey => monkey.count)
        console.log(counts.splice(counts.indexOf(Math.max(...counts)), 1)[0] * Math.max(...counts));
    }
    catch (err) {
        console.log(err);
    }
});