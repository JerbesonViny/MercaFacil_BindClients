import "express-async-errors";
import { Router, Request, Response } from 'express';

import { tokenRequired } from "./middlewares/main";
import { ContactsController } from './controllers/contactscontroller';
import { TokenController } from "./controllers/tokencontroller";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        "message": "Acesse a rota /docs para ter acesso a documentacao do projeto"
    })
});

// Contacts
router.get("/contacts/", tokenRequired, new ContactsController().all);
router.post("/contacts/", tokenRequired, new ContactsController().create);

// Token
router.get("/token/", tokenRequired, new TokenController().decode);
router.post("/token/", new TokenController().create);