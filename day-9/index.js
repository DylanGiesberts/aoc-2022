import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
// fs.readFile("rick.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n");
        rows.pop();

        function moveHead(num, dir) {
            if (num < 0) {
                for (let i = 1; i <= Math.abs(num); i++) {
                    head[dir] -= 1;
                    moveTail(true);
                }
            }
            else {
                for (let i = 1; i <= num; i++) {
                    head[dir] += 1;
                    moveTail(false);
                }
            }
        }

        function moveTail(isNegative) {
            let tailMoveX = 0,
                tailMoveY = 0;
            if (Math.abs(head.x - tail.x) > 1) {
                tailMoveX += isNegative ? -1 : 1
            }
            if (Math.abs(head.y - tail.y) > 1) {
                tailMoveY += isNegative ? -1 : 1
            }
            if (Math.abs(head.y - tail.y) == 1 && tailMoveX != 0) {
                tailMoveY += 1*(head.y - tail.y);
            }
            if (Math.abs(head.x - tail.x) == 1 && tailMoveY != 0) {
                tailMoveX += 1*(head.x - tail.x);
            }
            tail.x += tailMoveX;
            tail.y += tailMoveY;
            visited.push([tail.x, tail.y]);
        }

        function moveRope(num, dir) {
            if (num < 0) {
                for (let i = 1; i <= Math.abs(num); i++) {
                    rope[0][dir] -= 1;
                    moveRopeKnot(1);
                }
            }
            else {
                for (let i = 1; i <= Math.abs(num); i++) {
                    rope[0][dir] += 1;
                    moveRopeKnot(1);
                }
            }
        }

        function moveRopeKnot(index) {
            let knotMoveX = 0,
                knotMoveY = 0;
            if (Math.abs(rope[index-1].x - rope[index].x) > 1) {
                if (rope[index-1].x - rope[index].x < 0) {
                    knotMoveX += -1;
                }
                else {
                    knotMoveX += 1;
                }
            }
            if (Math.abs(rope[index-1].y - rope[index].y) > 1) {
                if (rope[index-1].y - rope[index].y < 0) {
                    knotMoveY += -1;
                }
                else {
                    knotMoveY += 1;
                }
            }
            if (Math.abs(rope[index-1].y - rope[index].y) == 1 && knotMoveX != 0) {
                knotMoveY += 1*(rope[index-1].y - rope[index].y);
            }
            if (Math.abs(rope[index-1].x - rope[index].x) == 1 && knotMoveY != 0) {
                knotMoveX += 1*(rope[index-1].x - rope[index].x);
            }
            rope[index].x += knotMoveX;
            rope[index].y += knotMoveY;
            if (index < rope.length-1) {
                moveRopeKnot(index+1);
            }
            else {
                visited.push([rope[index].x, rope[index].y]);
            }
        }

        // Part 1
        let head = { x: 0, y: 0 },
            tail = { x: 0, y: 0 },
            visited = [];
        rows.forEach((row) => {
            const [ move, amount ] = row.split(" ");
            if (move == "U") {
                moveHead(-amount, "y")
            }
            else if (move == "R") {
                moveHead(amount, "x");
            }
            else if (move == "D") {
                moveHead(amount, "y");
            }
            else if (move == "L") {
                moveHead(-amount, "x");
            }
        });
        visited = Array.from(new Set(visited.map(JSON.stringify))).map(JSON.parse);
        console.log(visited.length);

        // Part 2
        visited = [];
        let rope = [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0}
        ];
        rows.forEach((row) => {
            const [ move, amount ] = row.split(" ");
            if (move == "U") {
                moveRope(-amount, "y")
            }
            else if (move == "R") {
                moveRope(amount, "x");
            }
            else if (move == "D") {
                moveRope(amount, "y");
            }
            else if (move == "L") {
                moveRope(-amount, "x");
            }
        });

        visited = Array.from(new Set(visited.map(JSON.stringify))).map(JSON.parse);
        console.log(visited.length);

    }
    catch (err) {
        console.log(err);
    }
});