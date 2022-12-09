import fs from "fs";

fs.readFile("input.txt", 'utf-8', (err, data) => {
    try {

        function sumPerDir(dir) {
            let dirSum = sumTree(dir);
            if (dirSum > 100000) {
                dirSum = 0;
            }
            sumTotal += dirSum;
            for (let key in dir) {
                if (key != "parent" && typeof dir[key] === "object") {
                    sumPerDir(dir[key]);
                }
            }
        }

        function sumTree(tree) {
            let sum = 0;
            for (let key in tree) {
                if (key != "parent") {
                    if (typeof tree[key] === "object") {
                        sum += sumTree(tree[key]);
                    }
                    else { 
                        sum += tree[key];
                    }
                }
            }
            return sum;
        }

        function GetSmallestDir(dir) {
            let dirSum = sumTree(dir);
            if (dirSum > requiredDirSpace && dirSum < smallestDir) {
                smallestDir = dirSum;
            }
            for (let key in dir) {
                if (key != "parent" && typeof dir[key] === "object") {
                    GetSmallestDir(dir[key]);
                }
            }
        }

        const rows = data.split("\n");
        rows.shift();
        rows.pop();

        // Part 1
        let tree = { },
            currDir = tree,
            sumTotal = 0;

        rows.forEach((row) => {
            if (row.includes("$")) {
                if (row.split(" ")[1] == "cd") {
                    if (row.split(" ")[2] == "..") {
                        currDir = currDir.parent;
                    }
                    else {
                        let dir = row.split(" ")[2];
                        currDir = currDir[dir];
                    }
                }
            }
            else if (row.slice(0,3) == "dir") {
                let dir = row.split(" ")[1];
                currDir[dir] = { parent: currDir }
            }
            else {
                let [size, file] = row.split(" ");
                size = parseInt(size);
                currDir[file] = size;
            }
        });
        sumPerDir(tree);
        console.log(sumTotal);

        // Part 2
        tree = { };
        currDir = tree;
        let totalDiskSpace = 70000000,
            usedDiskSpace = 0,
            smallestDir = Infinity;
        rows.forEach((row) => {
            if (row.includes("$")) {
                if (row.split(" ")[1] == "cd") {
                    if (row.split(" ")[2] == "..") {
                        currDir = currDir.parent;
                    }
                    else {
                        let dir = row.split(" ")[2];
                        currDir = currDir[dir];
                    }
                }
            }
            else if (row.slice(0,3) == "dir") {
                let dir = row.split(" ")[1];
                currDir[dir] = { parent: currDir }
            }
            else {
                let [size, file] = row.split(" ");
                size = parseInt(size);
                currDir[file] = size;
            }
        });
        usedDiskSpace = sumTree(tree);
        const requiredDirSpace = (totalDiskSpace - usedDiskSpace - 30000000)/-1;
        GetSmallestDir(tree);
        console.log(smallestDir);

    }
    catch (err) {
        console.log(err);
    }
});