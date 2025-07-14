const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`a`);
});

app.post("/newupdate", (req, res) => {
  const { file, lines } = req.body;

  if (!file || !lines) {
    if (!file) {
        file = "missing"
    }
    if (!lines) {
        lines = "missing"
    }
    return res.status(400).json({ error: `payload invalid. file: ${file}, lines: ${lines}` });
  }

  const filePath = path.resolve(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.log("Cant find the file. creating it.")
    fs.writeFileSync(filePath, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
  }

  fs.readFile(filePath, "utf8", (e, data) => {
    if (e) {
      return res.status(500).json({ error: `file ${filePath} does not exist on this computer` });
    }
 
    let fileLines = data.split("\n");

    for (const lineNumStr in lines) {
      const lineNum = parseInt(lineNumStr) - 1; 
      for (const lineNumStr in lines) { // this is creating new lines as you cant just write to a line which doesnt exist which is very stupid
        const lineNum = parseInt(lineNumStr) - 1;
        
        while (lineNum >= fileLines.length) {
            fileLines.push("");
        }
        
        fileLines[lineNum] = lines[lineNumStr];
        }
    }

    const newContent = fileLines.join("\n");
    fs.writeFile(filePath, newContent, "utf8", (e) => {
      if (e) {
        return res.status(500).json({ error: `failed to update ${e}` });
      }
      res.json({ status: "success", updatedLines: Object.keys(lines).length });
    });
  });
});
