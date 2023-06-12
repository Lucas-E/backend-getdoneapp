var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Sequelize = require("./models");

//setting up router
const registrationRouter = require('./routes/registration')
const authRouter = require('./routes/authentication')
const userRouter = require('./routes/user')


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//setting up routes
app.use('/registration', registrationRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

module.exports = app;
