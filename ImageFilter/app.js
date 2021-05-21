const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({dest: "uploads"});

app.set("views engine", "hbs");
app.use("/style", express.static(`${__dirname}/css`));
app.use("/img", express.static(`${__dirname}/uploads`));
app.use("/fim", express.static(`${__dirname}/func`));

app.get("/", function (request, response) {
    response.render("index.hbs");
});

app.post("/", upload.single("data"), function (request, response) {
    let data = request.file;
    if (!data)
        //response.send("Ошибка при загрузке файла");
        response.render("errorPage.hbs");
    else {
        response.render("imageView.hbs", {pth: data.filename});
    }
});

app.listen(80);
