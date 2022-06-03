import { clientVarejao } from "../data-source";
import { IRequestContacts } from "../entity/main";
import { Contacts } from "../database/varejao/Contacts";

export class ContactsUseCases {
    async create({ contacts }: IRequestContacts) {
        const result = clientVarejao.initialize().then(async () => {
            
            var ids = await clientVarejao.createQueryBuilder()
                .insert()
                .into(Contacts)
                .values(contacts)
                .execute();

            clientVarejao.destroy();


            return ids

        }).catch(error => console.log(error))

        return result
    }

    async getAll() {
        const result = clientVarejao.initialize().then(async () => {
            
            var contacts = await clientVarejao.manager.find(Contacts)

            clientVarejao.destroy();

            return contacts

        }).catch(error => console.log(error))

        return result
    }
};