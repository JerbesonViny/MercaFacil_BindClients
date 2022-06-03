import { clientVarejao } from "../data-source";
import { IRequestContacts } from "../entity/main";
import { VarejaoContacts } from "../entity/Contact";

export class ContactsUseCases {
    async create({ contacts }: IRequestContacts) {
        const result = clientVarejao.initialize().then(async () => {
            
            var ids = await clientVarejao.createQueryBuilder()
                .insert()
                .into(VarejaoContacts)
                .values(contacts)
                .execute();

            clientVarejao.destroy();


            return ids

        }).catch(error => console.log(error))

        return result
    }

    async getAll() {
        const result = clientVarejao.initialize().then(async () => {
            
            var contacts = await clientVarejao.manager.find(VarejaoContacts)

            clientVarejao.destroy();

            return contacts

        }).catch(error => console.log(error))

        return result
    }
};