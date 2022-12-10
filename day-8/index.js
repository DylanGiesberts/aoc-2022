import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {
        const rows = data.split("\n").map(row => row.split("").map(tree => parseInt(tree)));
        rows.pop();

        function checkUp(tree, rowIndex, colIndex) {
            if (rowIndex == 0) {
                return true;
            }
            else if (tree > rows[rowIndex-1][colIndex]) {
                return checkUp(tree, rowIndex-1, colIndex);
            }
            return false;
        }

        function checkRight(tree, rowIndex, colIndex) {
            if (colIndex == rows[0].length-1) {
                return true;
            }
            else if (tree > rows[rowIndex][colIndex+1]) {
                return checkRight(tree, rowIndex, colIndex+1);
            }
            return false;
        }

        function checkDown(tree, rowIndex, colIndex) {
            if (rowIndex == rows.length-1) {
                return true;
            }
            else if (tree > rows[rowIndex+1][colIndex]) {
                return checkDown(tree, rowIndex+1, colIndex);
            }
            return false;
        }

        function checkLeft(tree, rowIndex, colIndex) {
            if (colIndex == 0) {
                return true;
            }
            else if (tree > rows[rowIndex][colIndex-1]) {
                return checkLeft(tree, rowIndex, colIndex-1);
            }
            return false;
        }

        function getScenicScore(tree, rowIndex, colIndex) {
            return LookUp(tree, rowIndex, colIndex) * LookRight(tree, rowIndex, colIndex) * LookDown(tree, rowIndex, colIndex) * LookLeft(tree, rowIndex, colIndex);
        }

        function LookUp(tree, rowIndex, colIndex) {
            if (rowIndex == 0) {
                return 0;
            }
            else if (rows[rowIndex-1][colIndex] >= tree) {
                return 1;
            }
            else {
                return 1 + LookUp(tree, rowIndex-1, colIndex,);
            }
        }

        function LookRight(tree, rowIndex, colIndex) {
            if (colIndex == rows[0].length-1) {
                return 0;
            }
            else if (rows[rowIndex][colIndex+1] >= tree) {
                return 1;
            }
            else {
                return 1 + LookRight(tree, rowIndex, colIndex+1);
            }
        }

        function LookDown(tree, rowIndex, colIndex) {
            if (rowIndex == rows.length-1) {
                return 0;
            }
            else if (rows[rowIndex+1][colIndex] >= tree) {
                return 1;
            }
            else {
                return 1 + LookDown(tree, rowIndex+1, colIndex);
            }
        }

        function LookLeft(tree, rowIndex, colIndex) {
            if (colIndex == 0) {
                return 0
            }
            else if (rows[rowIndex][colIndex-1] >= tree) {
                return 1;
            }
            else {
                return 1 + LookLeft(tree, rowIndex, colIndex-1);
            }
        }

        // Part 1
        let count = 0;
        rows.forEach((treeRow, rowIndex) => {
            treeRow.forEach((tree, colIndex) => {
                if (rowIndex == 0 || rowIndex == rows.length-1 || colIndex == 0 || colIndex == treeRow.length-1) {
                    count++;
                }
                else if (checkUp(tree, rowIndex, colIndex)) {
                    count++;
                }
                else if (checkRight(tree, rowIndex, colIndex)) {
                    count++;
                }
                else if (checkDown(tree, rowIndex, colIndex)) {
                    count++;
                }
                else if (checkLeft(tree, rowIndex, colIndex)) {
                    count++;
                }
            });
        });
        console.log(count);

        // Part 2
        count = 0;
        let scenicMax = 0;
        rows.forEach((treeRow, rowIndex) => {
            treeRow.forEach((tree, colIndex) => {
                let scenicScore = getScenicScore(tree, rowIndex, colIndex);
                if (scenicScore > scenicMax) {
                    scenicMax = scenicScore;
                }
            });
        });
        console.log(scenicMax);

    }
    catch (err) {
        console.log(err);
    }
});