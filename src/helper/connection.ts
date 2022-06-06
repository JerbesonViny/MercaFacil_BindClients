import { Jwt } from "jsonwebtoken";
import { clientMacapa, clientVarejao } from "../data-source";
import { Payload } from "../entity/main";
import { ContactsUseCases } from "../usecases/contactsusecases";
import { verifyToken } from "./token";


export function getConnectionByClient(token) {
    const payload = <Payload>verifyToken(token);

    if (payload.client_uuid == process.env.CLIENT_VAREJAO_KEY) {
        return {"client": clientVarejao, "client_uuid": payload.client_uuid};
    }
    
    return {"client": clientMacapa, "client_uuid": payload.client_uuid};
}

export function validClientUuid(client_uuid: string): boolean {
    if(client_uuid == process.env.CLIENT_MACAPA_KEY || client_uuid == process.env.CLIENT_VAREJAO_KEY) {
        return true;        
    };

    return false;
}