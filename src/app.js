//Importaciones
import express from "express";
import Handlebars from "express-handlebars";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js";
import viewRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import ProductsService from "./service/products.service.js";
import mongoose from "mongoose";
import passport from "passport";
import __dirname from "./utils.js";
import session from "express-session";
import dotenv from "dotenv";
import initializePassport from "./config/passport.config.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

//products
const productService = new ProductsService()

//Rutas
import userViewsRouter from "./routes/users.views.router.js"
import sessionRouter from "./routes/session.router.js"

//express
const app = express ()
//dotenv
dotenv.config()

//JSON config
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//handlebars
app.engine('handlebars', Handlebars.engine())
app.set('views', __dirname, '/views') 
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))
app.engine ("handlebars", handlebars.engine())
app.set("views", _dirname + "/views")
app.set("view engine", "handlebars")
app.use("/public", express.static(_dirname + "/public"))

//middlewares
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
//cookie
app.use(cookieParser("CoderS3cr3tC0d3"))


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
app.use("/", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/user", userRouter)








//serverhttp
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

let rtp


const getrtp= async () => {
    try {
        rtp=await productService.getProducts()
    } catch (error) {
    }}





//serverwebsocket
export const socketServer= new Server(httpServer)
// En el servidor (Socket.IO)
socketServer.on("connection", (socket) => {
  // Al recibir un nuevo producto desde el cliente
socket.on("newProduct", async (productData) => {
    try {
      // Añadir el nuevo producto
        await productService.addProduct(productData);
    
      await getrtp();  // Esperar a que rtp esté actualizado
      socket.emit("products", rtp);  // Enviar la lista de productos actualizada a todos los clientes
    } catch (error) {
        console.error("Error añadiendo producto: ", error.message);
    }
});


  getrtp();  // Esperar a que rtp esté actualizado
  socket.emit("products", rtp);  // Emitir productos al cliente
});