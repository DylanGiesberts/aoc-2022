import fs from "fs";


// Part 1
// A (65), X (88) = rock
// B (66), Y (89) = paper
// C (67), Z (90) = scissors

// Part 2
// A (65) = rock (1)
// B (66) = paper (2)
// C (67) = scissors (3)
// X = lose
// Y = draw
// Z = win

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n");
        rows.pop();

        // Part 1
        let score = 0;
        rows.forEach((row) => {
            const hand = row.split(" ");
            if (hand[0].charCodeAt() - (hand[1].charCodeAt()-23) == 0) {
                score += 3 + hand[1].charCodeAt()-23-64;
            } 
            else if (hand[0].charCodeAt() - (hand[1].charCodeAt()-23) == -1 || hand[0].charCodeAt() - (hand[1].charCodeAt()-23) == 2) {
                score += 6 + hand[1].charCodeAt()-23-64;
            }
            else if (hand[0].charCodeAt() - (hand[1].charCodeAt()-23) == 1 || hand[0].charCodeAt() - (hand[1].charCodeAt()-23) == -2) {
                score += hand[1].charCodeAt()-23-64;
            }
        });
        console.log(score);

        // Part 2
        let score2 = 0;
        rows.forEach((row) => {
            const hand = row.split(" ");
            if (hand[1] == "X") {
                // lose
                score2 += (hand[0] == "A" ? 3 : hand[0].charCodeAt()-65);
            }
            else if (hand[1] == "Y") {
                // draw
                score2 += 3 + (hand[0].charCodeAt()-64);
            }
            else if (hand[1] == "Z") {
                // win
                score2 += 6 + (hand[0] == "C" ? 1 : hand[0].charCodeAt()-63);
            }
        });
        console.log(score2);

    }
    catch (err) {
        console.log(err);
    }
})