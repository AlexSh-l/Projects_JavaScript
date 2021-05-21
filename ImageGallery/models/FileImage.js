const {mysqlPool} = require("./MysqlPool");

async function imageExistCheck(fileName, userId) {
    try {
        let mysqlResult = await mysqlPool.execute("SELECT name FROM images WHERE (filename, user_id) = (?, ?)", [fileName, userId]);
        return mysqlResult[0].length !== 0;
    } catch (e) {
        console.log(`Error in imageExistCheck`);
        throw e;
    }
}

async function insertImage(imageName, fileName, userId) {
    try {
        return (await mysqlPool.execute("INSERT INTO images (name, filename, user_id) VALUES (?, ?, ?)", [imageName, fileName, userId]));
    } catch (e) {
        console.log(`Error in insertImage`);
        throw e;
    }
}

async function getImages(userId) {
    try {
        return (await mysqlPool.execute("SELECT name FROM images WHERE user_id = ?", [userId]));
    } catch (e) {
        console.log(`Error in getImage`);
        throw e;
    }
}

module.exports.insertImage = insertImage;
module.exports.getImages = getImages;
module.exports.imageExistCheck = imageExistCheck;