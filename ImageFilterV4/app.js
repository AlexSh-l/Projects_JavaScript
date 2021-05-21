const express = require("express");
const app = express();
const User = require("./models/User")
const multer = require("multer");
const upload = multer({dest: "uploads"});
const config = require("config");
const jwt = require("jsonwebtoken");
const {Router} = require('express');
const router = Router();
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const {GraphQLList} = require("graphql");
const {GraphQLSchema} = require("graphql");
const {graphqlHTTP} = require("express-graphql");
const {GraphQLString} = require("graphql");
const {GraphQLObjectType} = require("graphql");
const PORT = config.get("port") || 5000;

app.use("/img", express.static(`${__dirname}/uploads`));
app.use("/fim", express.static(`${__dirname}/func`));
app.use(express.json({extended: true}))
//app.use("/api/auth", require("./routes/authroutes"));

const AuthResultType = new GraphQLObjectType({
    name: "AuthResult",
    fields: () => ({
        token: {type: GraphQLString},
        error: {type: GraphQLString},
    })
})

function verifyJwt(token) {
    try {
        if (!token) {
            return null
        }
        return jwt.verify(token, config.get('jwtSecret'))
    } catch {
        return null
    }
}

const RootQuery = new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            restore_auth: {
                type: AuthResultType,
                args: {token: {type: GraphQLString}},
                async resolve(parent, args) {
                    let token = args.token
                    if (token && verifyJwt(token)) {
                        return {token, message: null}
                    } else {
                        return {token: null, message: 'Wrong token'}
                    }
                }
            },
            sign_in: {
                type: AuthResultType,
                args: {
                    login: {type: GraphQLString},
                    password: {type: GraphQLString}
                },
                async resolve(parent, args) {
                    const login = args.login
                    const password = args.password
                    let userCheck = await User.findUserByLogin(login);
                    if(userCheck.result === null){
                        return {message: "Incorrect login or password."}
                    }
                    const passCheck = await bcrypt.compare(password, userCheck.result.password)
                    if(!passCheck){
                        return {message: "Incorrect login or password."}
                    }
                    const token = jwt.sign(
                        {userId: userCheck.result.userId},
                        config.get("jwtKey"),
                        {expiresIn: "1h"}
                    )
                    return {token: token, userId: userCheck, message: "Authorization successful."}
                }
            }
        }
    }
)

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        sign_up: {
            type: AuthResultType,
            args: {
                login: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const login = args.login
                const email = args.email
                const password = args.password
                const existCheck = await User.existCheck(email, login);
                if (!existCheck.result){
                    return {token: null, message: existCheck.message}
                }
                const encryptedPassword = await bcrypt.hash(password, 10)
                const createUser = await User.createUser(login, email,encryptedPassword);
                const token = jwt.sign(
                    {userId: createUser},
                    config.get("jwtKey"),
                    {expiresIn: "1h"}
                )
                return {token: token, userId: createUser, message: "User has been created."}
            }
        }
    }
})

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}))

app.post("/upload", upload.single("file"), function (request, response) {
    let data = request.file;
    if (!data)
        response.send("File upload error");
    else {
        response.send(data.filename)
    }
});

async function start(){
    try{
        await app.listen(PORT, ()=>console.log(`App has been started at port ${PORT}...`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();
