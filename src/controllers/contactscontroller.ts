import { Request, Response } from "express";

import { IRequestContacts } from "../entity/main";
import { HttpException } from "../helper/httperrors";
import { contactHandle, validateCellphone } from "../helper/datamanipulate";

import { getConnectionByClient } from "../helper/connection";
import { ContactsUseCases } from "../usecases/contactsusecases";

export class ContactsController {
    async create(req: Request, res: Response) {
        const [, token] = req.headers.authorization.split(" ");
        const listContact = <IRequestContacts>req.body;

        try {
            /** Pegando a conexao com o banco a partir do cliente
             * Varejao - PostgreSQL
             * Macapa - MySQL
             */
            var datasource = getConnectionByClient(token);
            var connection = new ContactsUseCases(datasource.client);
        } catch (error) {
            throw new HttpException(401, "Invalid Token");
        }

        try {
            // Captando os contatos validos
            listContact.contacts = await validateCellphone(listContact.contacts);

            // Verificando se o cliente autenticado eh macapa
            if( datasource.client_uuid == process.env.CLIENT_MACAPA_KEY ) {
                // Aplicando a regra de negocio do cliente macapa
                listContact.contacts = await contactHandle(listContact.contacts);
            }

            var result = await connection.create(listContact);
        } catch (error) {
            throw new HttpException(500, "Cannot create a new contact");
        }

        res.status(201).json(result["identifiers"]);
    }

    async all(req: Request, res: Response) {
        const [, token] = req.headers.authorization.split(" ");
        
        try {
            const datasource = getConnectionByClient(token);
            var connection = new ContactsUseCases(datasource.client);
        } catch (error) {
            throw new HttpException(401, "Invalid Token");
        }

        try {
            var result = await connection.getAll();
        } catch (error) {
            throw new HttpException(500, "Cannot get all contacts");
        }

        res.status(200).json({"contacts": result});
    }
};