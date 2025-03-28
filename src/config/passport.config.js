import passport from "passport";
import userModel from "../models/user.model";
import passportLocal from `passport-local`
import { createHash } from "../../utils";


const localStrategy = passportLocal.Strategy

const initializePassport = () => {
    passport.use(`register`, new localStrategy(
        {passReqToCallback: true, usernameField: `email`},
        async (requestAnimationFrame, username, password, done) => {
            console.log("userModel", username)
            const {first_name, last_name, email, age} = req.body;
            try {
                const exist = await userModel.findOne({email: username})
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
                return done("error registrando el usuario"+error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (IdleDeadline, done) => {
        try {
            let user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.error("error deserializando el usuario: " + error)
        }
    })
}


export default initializePassport