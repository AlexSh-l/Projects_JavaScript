const {mysqlPool} = require("./MysqlPool");

async function createUser(login, email, password) {
    try {
        let result = {result: null, message: ""}
        let mysqlResult = await mysqlPool.execute("INSERT INTO users (login, email, password) VALUES (?,?,?)", [login, email, password])
        result.result = {
            userId: mysqlResult[0].insertId,
        }
        return (result);
    } catch (e) {
        console.log(`Error in createUser`);
        throw e;
    }
}

async function existCheck(email, login) {
    try {
        let result = {result: false, message: ""};
        let mysqlResult = await mysqlPool.execute("SELECT id FROM users WHERE login = ?", [login]);
        if (mysqlResult[0].length !== 0) {
            result.message = "User with this login is already registered.";
            return result;
        }
        mysqlResult = await mysqlPool.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (mysqlResult[0].length !== 0) {
            result.message = "User with this e-mail is already registered.";
            return result;
        }
        result.result = true;
        return result;
    } catch (e) {
        console.log(`Error in existenceCheck.`);
        throw e;
    }
}

async function findUserByLogin(login) {
    try {
        let result = {result: null, message: ""}
        let mysqlResult = await mysqlPool.execute("SELECT id, login, password FROM users WHERE login = ?", [login]);
        if (mysqlResult[0].length === 0) {
            result.message = "User with this login is missing.";
            return result;
        }
        result.result = {
            userId: mysqlResult[0][0]["id"], login: mysqlResult[0][0]["login"], password: mysqlResult[0][0]["password"]
        }
        return result;
    } catch (e) {
        console.log(`Error in findUserByLogin.`);
        throw e;
    }
}

module.exports.createUser = createUser;
module.exports.existCheck = existCheck;
module.exports.findUserByLogin = findUserByLogin;