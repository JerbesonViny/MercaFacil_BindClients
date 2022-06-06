import { Request, Response } from "express";

import { Payload } from "../entity/main";
import { HttpException } from "../helper/httperrors";
import { validClientUuid } from "../helper/connection";
import { generateToken, verifyToken } from "../helper/token";

export class TokenController {
    async create(req: Request, res: Response) {
        const payload = <Payload>req.body;

        // Verificando a presenca do client_uuid no corpo da requisicao
        if(!payload.client_uuid) {
            throw new HttpException(422, 'Not found client_uuid in the request body');
        };
    
        // Verificando se o client_uuid pertence a um cliente
        if(!validClientUuid(payload.client_uuid)) {
            throw new HttpException(401, "This client does not exists");
        }
    
        try {
            const token = generateToken(payload);
    
            res.status(200).json({"token": token});
        } catch (error) {
            throw new HttpException(500, "Error on try create a jwt");
        };
    }

    async decode(req: Request, res: Response) {
        const [, token] = req.headers.authorization.split(" ");

        try {
            const decodedToken = verifyToken(token);
    
            res.json({"decodedToken": decodedToken});
        } catch (error) {
            throw new HttpException(401, "Invalid Token");
        };
    }
};