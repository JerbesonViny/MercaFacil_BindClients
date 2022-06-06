import { sign, verify } from "jsonwebtoken";
import { Payload } from "../entity/main";

function generateToken(payload: Payload) {
    try {
        var token = sign(payload, 'secret', { expiresIn: '15m' });
    
        return token;
    } catch (error) {
        throw new Error("Error on try create a token");
    };
};

function verifyToken(token) {
    try {
        var decodedToken = verify(token, 'secret');

        return decodedToken;
    } catch (error) {
        throw new Error("Invalid Token");
    };
};

export { generateToken, verifyToken };