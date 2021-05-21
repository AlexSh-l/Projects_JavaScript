const express = require("express");
const app = express();
const server = require("http").createServer(app)
const multer = require("multer");
const upload = multer({dest: "uploads"});
const config = require("config");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const PORT = config.get("port") || 5000;

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use("/img", express.static(`${__dirname}/uploads`));
app.use("/fim", express.static(`${__dirname}/func`));
app.use(express.json({extended: true}))

app.post("/upload", upload.single("file"), function (request, response) {
    let data = request.file;
    if (!data)
        response.send("File upload error");
    else {
        response.send(data.filename)
    }
});

function onConnect(socket){
    socket.on("api/register", async(data, callback)=>{
        try {
            const errors = validationResult(data);
            if(!errors.isEmpty()){
                let errorMessage = "Registration errors: ";
                for (let error of errors){
                    errorMessage = errorMessage + "<br/>" + error.msg;
                }
                callback({
                    errors: errors.array(),
                    message: errorMessage
                })
            }
            const {login, email, password} = data;
            const existCheck = await User.existCheck(email, login);
            if (!existCheck.result){
                callback({
                    message: existCheck.message
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 10)
            const createUser = await User.createUser(login, email,encryptedPassword);
            const token = jwt.sign(
                {userId: createUser},
                config.get("jwtKey"),
                {expiresIn: "1h"}
            )
            callback({
                token,
                userId: createUser,
                message: "User has been created."
            })
        } catch (e) {
            callback({
                message: "Something went wrong during registration. Please try again."
            })
        }
    })
    socket.on("api/login", async(data,callback)=>{
        try {
            const errors = validationResult(data);
            if(!errors.isEmpty()){
                callback({
                    errors: errors.array(),
                    message: "Incorrect data."
                })
            }
            const {login, password} = data;
            let userCheck = await User.findUserByLogin(login);
            if(userCheck.result === null){
                callback({
                    message: "Incorrect login or password."
                })
            }
            const passCheck = await bcrypt.compare(password, userCheck.result.password)
            if(!passCheck){
                callback({
                    message: "Incorrect login or password."
                })
            }
            const token = jwt.sign(
                {userId: userCheck.result.userId},
                config.get("jwtKey"),
                {expiresIn: "1h"}
            )
            callback({
                token,
                userId: userCheck,
                message: "Authorization successful."
            })
        } catch (e) {
            callback({
                message: "Something went wrong while singing in. Please try again."
            })
        }
    })
}

io.on("connection", onConnect)

async function start(){
    try{
        await server.listen(PORT, ()=>console.log(`App has been started at port ${PORT}...`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();
