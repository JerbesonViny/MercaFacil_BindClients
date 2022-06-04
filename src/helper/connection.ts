import { Jwt } from "jsonwebtoken";
import { clientMacapa, clientVarejao } from "../data-source";
import { Payload } from "../entity/main";
import { ContactsUseCases } from "../usecases/contactsusecases";
import { verifyToken } from "./token";


export function getConnectionByClient(token) {
    const payload = <Payload>verifyToken(token);

    if (payload.type_client == 1) {
        return {"client": clientVarejao, "type_client": payload.type_client};
    } else {
        return {"client": clientMacapa, "type_client": payload.type_client};
    };
}