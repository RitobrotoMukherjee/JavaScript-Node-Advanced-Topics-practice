console.log("Create and Write to newFile.txt");

const fs = require("node:fs");

const written = fs.writeFileSync("newFileSync.txt", "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do", "utf-8");

console.log("File written successfully:", written === undefined ? "No return value" : written);

let content = fs.readFileSync("newFileSync.txt", "utf-8");
console.log("Content of newFileSync.txt:", content, "\n");

/*
    Read and write from a file
    using async operations
*/

try {
    fs.rmdirSync("AsyncDir", { recursive: true });
} catch (err) {
    console.error("Error removing directory:");
}

try {
    fs.mkdirSync("AsyncDir");
} catch (err) {
    console.error("Error creating directory:");
}

fs.writeFile("AsyncDir/newFileAsync.txt", content, "utf-8", (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("\nAsync file written successfully");
});

content = fs.readFile("AsyncDir/newFileAsync.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("\nContent of AsyncDir/newFileAsync.txt:", data);
});