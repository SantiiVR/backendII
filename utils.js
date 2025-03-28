import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPasswird = (user , password) => {
    console.log(`datos a validar: user-password: ${user.password}, password: ${password}`)
    return bcrypt.compareSync(password, user.password)
}

export const generateJWToken= (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: `24`})
}


export default __dirname