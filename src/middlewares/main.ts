import { NextFunction, Request, Response } from "express";
import { HttpException } from "../helper/httperrors";

export function errorHandling(err: HttpException, request: Request, response: Response, next: NextFunction) {
    response.status(err.statusCode)
        .json({"error": err.message})
}