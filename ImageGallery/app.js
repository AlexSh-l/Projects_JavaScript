const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({dest: "uploads"});
const config = require("config");
const PORT = config.get("port") || 5000;

app.use("/img", express.static(`${__dirname}/uploads`));
app.use(express.json({extended: true}))
app.use("/api", require("./routes/routes"));

app.post("/upload", upload.single("file"), function (request, response) {
    let data = request.file;
    if (!data)
        response.send("File upload error");
    else {
        response.send({name: data.filename, originalName: data.originalname})
    }
});

async function start() {
    try {
        await app.listen(PORT, () => console.log(`App has been started at port ${PORT}...`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();
