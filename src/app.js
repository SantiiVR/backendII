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
import dotenv from "dotenv"

//Rutas
import userViewsRouter from "./routes/users.views.router.js"
import sessionRouter from "./routes/session.router.js"

//express
const app = express ()
//dotenv
dotenv.config()

//JSON config
app.use(express.json())
app.use(express.urlencoded())

//handlebars
app.engine('handlebars', Handlebars.engine())
app.set('views', __dirname, '/views') 
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))

//mongo
const url_Mongo = process.env.MONGO_URl
app.use(session({
    store: MongoStore.create({
        mongoUrl: url_Mongo,
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

app.use("/user", userViewsRouter)
app.use("/api/sessions", sessionRouter)


const SERVER_PORT=process.env.SERVER_PORT
app.listen(SERVER_PORT,() => {
    console.log("escuchando el puerto" + SERVER_PORT)
})

const connectMongoDB= async () => {
    try {
        await mongoose.connect(url_Mongo)
        console.log("conectado con MongoDB")
    } catch (error) {
        console.error("no se pudo establecer conexion con Mongo"+error)
        process.exit()
    }
}
connectMongoDB()

