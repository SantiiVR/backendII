import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import passport from "passport"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPasswird = (user , password) => {
    console.log(`datos a validar: user-password: ${user.password}, password: ${password}`)
    return bcrypt.compareSync(password, user.password)
}

export const PRIVATE_KEY = "CoderBackendIISecretKey"


export const generateJWToken= (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24'})
}

export const passportcall = (Strategy) => {
    return async (req, res, next) => {
        console.log("llamar Strategy: ")
        console.log(Strategy)
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({error: info.message ? info.message: info.toString()})
            }

            console.log("Usuario obtenido desde strategy:")
            console.log(user)
            req.user = user

            next()
        }) (req, res, next)
    }
}

export const cookieExtractor = req => {
    let roken = null
    console.log("cookieExtractor")

    if (req && req.cookies) {
        console.log("cookies presentes")
        console.log(req.cookies)
        token = req.cookies('jwtCookieToken')
        console.log(token)
    }
    return token
}


export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: user not found  in jwt")
    
        if (req.user.role !== role){
            return res.status(403).send("forbidden: el usuario no tiene permisos con este rol")
        }

        next()
        }
}

export default __dirname