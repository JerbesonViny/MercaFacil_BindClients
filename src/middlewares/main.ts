import { NextFunction, Request, Response } from "express";
import { HttpException } from "../helper/httperrors";
import { verifyToken } from "../helper/token";

export function errorHandling(err: HttpException, request: Request, response: Response, next: NextFunction) {
    response.status(err.statusCode).json({"error": err.message});
};

export function tokenRequired(request: Request, response: Response, next: NextFunction) {
    try {
        var [, token] = request.headers.authorization.split(" ");
        
        next()
    } catch (error) {
        throw new HttpException(401, "Token is required");
    }

    try {
        const decodedToken = verifyToken(token);
    } catch (error) {
        throw new HttpException(401, "Invalid Token");
    }
};