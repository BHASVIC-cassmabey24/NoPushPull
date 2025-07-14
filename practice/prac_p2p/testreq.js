

var payload = {
    file: "C:\\Users\\cass.mabey24\\OneDrive - BHASVIC\\computerscience\\Y2 Project\\practice\\prac_p2p\\file.js",
    lines: {
        3: "console.log(\"3\")",
        9: "console.log(\"9\")"
    }
};


fetch("http://localhost:3000/newupdate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(res => res.text())
.then(text => {
    console.log(text);
});