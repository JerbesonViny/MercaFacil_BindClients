import "express-async-errors";
import { Router, Request, Response } from 'express';

import { Payload } from './entity/main';
import { HttpException } from './helper/httperrors';
import { tokenRequired } from "./middlewares/main";
import { generateToken, verifyToken } from "./helper/token";
import { ContactsController } from './controllers/contactscontroller';
import { validClientUuid } from "./helper/connection";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        "env": "nice"
    })
});

// Contacts
router.get("/contacts/", tokenRequired, new ContactsController().all);
router.post("/contacts/", tokenRequired, new ContactsController().create);

// Token
router.post("/token/", (req: Request, res: Response) => {
    const payload = <Payload>req.body;

    // Verificando a presenca do client_uuid no corpo da requisicao
    if(!payload.client_uuid) {
        throw new HttpException(422, 'Not found client_uuid in the request body');
    };

    if(!validClientUuid(payload.client_uuid)) {
        throw new HttpException(401, "This client does not exists");
    }

    try {
        const token = generateToken(payload);

        res.json({"token": token});
    } catch (error) {
        throw new HttpException(400, "Error on try create a jwt");
    };
});

router.get("/decode-token/", tokenRequired, (req: Request, res: Response) => {
    const [, token] = req.headers.authorization.split(" ");

    try {
        const decodedToken = verifyToken(token);

        res.json({"token": token, "decodedToken": decodedToken});
    } catch (error) {
        throw new HttpException(401, "Invalid Token");
    };
});