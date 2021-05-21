const {Router} = require('express');
const User = require("../models/User");
const router = Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const {check, validationResult} = require("express-validator");
const upload = multer({dest: "uploads"});

router.post('/register', [
    check("password", "Password must be at least 8 symbols.").isLength({min: 8})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let errorMessage = "Registration errors: ";
            for (let error of errors){
                errorMessage = errorMessage + "<br/>" + error.msg;
            }
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessage
            })
        }

        const {login, email, password} = req.body;
        const existCheck = await User.existCheck(email, login);
        if (!existCheck.result){
            return res.status(400).json({message: existCheck.message});
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const createUser = await User.createUser(login, email,encryptedPassword);
        const token = jwt.sign(
            {userId: createUser},
            config.get("jwtKey"),
            {expiresIn: "1h"}
        )
        res.status(201).json({token, userId: createUser, message: "User has been created."});
    } catch (e) {
        res.status(500).json({message: "Something went wrong during registration. Please try again."});
    }
})

router.post('/login', [
    check("password", "Password must be at least 8 symbols.").isLength({min: 8})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data."
            })
        }

        const {login, password} = req.body;
        let userCheck = await User.findUserByLogin(login);
        if(userCheck.result === null){
            return res.status(400).json({message: "Incorrect login or password."});
        }
        const passCheck = await bcrypt.compare(password, userCheck.result.password)
        if(!passCheck){
            return res.status(400).json({message: "Incorrect login or password."});
        }
        const token = jwt.sign(
            {userId: userCheck.result.userId},
            config.get("jwtKey"),
            {expiresIn: "1h"}
        )
        res.status(200).json({token, userId: userCheck, message: "Authorization successful."});
    } catch (e) {
        res.status(500).json({message: "Something went wrong while singing in. Please try again."});
    }
})

module.exports = router