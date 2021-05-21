const {Router} = require('express');
const User = require("../models/User");
const router = Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const {check, validationResult} = require("express-validator");

module.exports = (io, socket) => {
    async function registerUser(accountData, callback) {
        try {

        } catch (e) {
        }
    }
}