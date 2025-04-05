import passport from "passport";
import userModel from "../models/user.model";
import passportLocal from 'passport-local'
import { createHash, PRIVATE_KEY, cookieExtractor } from "../utils.js";
import jwtStrategy from "passport-jwt";


const localStrategy = passportLocal.Strategy
const JwtStrategy = jwtStrategy.Strategy
const ExtractJwt = jwtStrategy.ExtractJwt

const initializePassport = () => {
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            console.log("entrando a passport strategy con jwt")
            try {
                console.log("jwt obtenido del payload")
                console.log(jwt_payload)
                return done(null, jwt_payload-user)
            } catch (error) {
                return done(error)
            }
        }
    ))








    passport.use(`register`, new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            console.log("userModel", username)
            const {first_name, last_name, email, age} = req.body;
            try {
                const exist = await userModel.findOne({ email: username })
                if (exist) {
                    console.log("el usuario ya existe")
                    return done(null, false)
                }
                const user = {
                    first_name,
                    last_name,
                    username,
                    age,
                    password: createHash(password),
                    loggedBy: "app"
                }
                const result = await userModel.create(user)
                return done(null, result)
            } catch (error) {
                return done("error al registrar el usuario " + error)
            }
        }
    ))


//Serializacion y Dessertializacion
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.error("error deserializando el usuario: " + error)
        }
    })
}


export default initializePassport