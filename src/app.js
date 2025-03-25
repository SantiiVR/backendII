//Importaciones
import express from "express";
import Handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import __dirname from "./utils.js";
import session from "express-session";
import dotenv from "dotenv";
import initializePassport from "./config/passport.config.js";
import MongoStore from "connect-mongo";

//Rutas
import viewsRoutes from "./routes/views.router.js"
import userViewsRouter from "./user.views.router.js"
import sessionRouter from "./routes/session.router.js"

//express
const app = express ()

//JSON config
app.use(express.json())
app.use(express.urlencoded())

//handlebars
app.engine(`handlebars`, Handlebars.engine())
app.set(`views`, __dirname, `/views`) 
app.set(`view engine`, `handlebars`)
app.use(express.static(__dirname+`/public`))

//mongo
const MONGO_URL = ``
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {userNewUrlParser:true, useUnifiedTopology:true},
        ttl:480
    }),
    secret: "coderS3cr3t",
    resave:false,
    saveUninitialized:true
}))

//passport
initializePassport()
app.use(passport.initialize())


//routes
app.use("/", viewsRoutes )
app.use("/user", userViewsRouterRoutes)
app.use("/api/sessions", sessionRouter)
