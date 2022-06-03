import {Router, Request, Response} from 'express';

import { HttpException } from './helper/httperrors';
import { ContactsController } from './controllers/contactscontroller';

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    throw new HttpException(401, "Unauthorized");
});

// Contacts
router.get("/contacts", new ContactsController().all);
router.post("/contacts/create", new ContactsController().create);