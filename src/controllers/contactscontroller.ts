import { Request, Response } from "express";

import { IRequestContacts } from "../entity/main";
import { HttpException } from "../helper/httperrors";
import { contactHandle } from "../helper/datamanipulate";

import { ContactsUseCases } from "../usecases/contactsusecases";
import { getConnectionByClient } from "../helper/connection";

export class ContactsController {
    async create(req: Request, res: Response) {
        const [, token] = req.headers.authorization.split(" ");
        const listContact = <IRequestContacts>req.body;

        try {
            var datasource = getConnectionByClient(token);
            var connection = new ContactsUseCases(datasource.client);

            if( datasource.type_client == 2 ) {
                listContact.contacts = await contactHandle(listContact.contacts);
            }
        } catch (error) {
            throw new HttpException(401, "Token invalid");
        }

        try {
            var result = await connection.create(listContact);
        } catch (error) {
            throw new HttpException(500, "Cannot create a new contact");
        }

        return res.status(201).json(result["identifiers"]);
    }

    async all(req: Request, res: Response) {
        const [, token] = req.headers.authorization.split(" ");
        
        try {
            const datasource = getConnectionByClient(token);
            var connection = new ContactsUseCases(datasource.client);
        } catch (error) {
            throw new HttpException(401, "Token invalid");
        }

        try {
            var result = await connection.getAll();
        } catch (error) {
            throw new HttpException(500, "Cannot get all contacts");
        }

        return res.status(200).json({"contacts": result})
    }
};