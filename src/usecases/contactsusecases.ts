import { DataSource } from "typeorm";
import { clientVarejao } from "../data-source";
import { IRequestContacts } from "../entity/main";
import { VarejaoContacts } from "../entity/Contact";

export class ContactsUseCases {
    datasource: DataSource;

    constructor(datasource: DataSource) {
        this.datasource = datasource;
    };

    async create({ contacts }: IRequestContacts) {
        const result = this.datasource.initialize().then(async () => {
            
            var ids = await this.datasource.createQueryBuilder()
                .insert()
                .into("contacts")
                .values(contacts)
                .execute();

            this.datasource.destroy();


            return ids

        }).catch((err) => { console.log(err); throw new Error('Error on insert data')})

        return result
    }

    async getAll() {
        const result = this.datasource.initialize().then(async () => {
            
            var contacts = await this.datasource
                .createQueryBuilder()
                .select(["name", "cellphone"])
                .from("contacts", "contacts")
                .execute()

            this.datasource.destroy();

            return contacts

        }).catch(error => console.log(error))

        return result
    }
};