import { Request, Response } from "express";
import { IRequestContacts } from "../entity/main";
import { HttpException } from "../helper/httperrors";
import { ContactsUseCases } from "../usecases/contactsusecases";

export class ContactsController {
    async create(req: Request, res: Response) {
        const listContact = <IRequestContacts>req.body;
    
        const connection = new ContactsUseCases();

        try {
            var result = await connection.create(listContact);
        } catch (error) {
            throw new HttpException(400, "Cannot create a new contact");
        }

        return res.status(201).json(result["identifiers"])
    }

    async all(req: Request, res: Response) {
        const connection = new ContactsUseCases();

        try {
            var result = await connection.getAll();

            res.status(201).json(result)
        } catch (error) {
            console.log(error)
            throw new HttpException(500, "Cannot create a new contact");
        }
    }
};