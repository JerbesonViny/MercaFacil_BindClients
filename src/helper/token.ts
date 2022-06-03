import { sign, verify } from "jsonwebtoken";
import { Payload } from "../entity/main";

function generateToken(payload: Payload) {
    try {
        var token = sign(payload, 'secret', { expiresIn: '20s' })
    
        return token
    } catch (error) {
        console.log(error)
    }
}

function verifyToken(token) {
    try {
        var decodedToken = verify(token, 'secret')

        return decodedToken
    } catch (error) {
        throw new Error("Token invalid")
    }
}

export { generateToken, verifyToken }