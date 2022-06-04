import { Contact } from "../entity/main";


export function contactHandle(contacts: Contact[]) {
    for ( let index in contacts ) {
        contacts[index].name = contacts[index].name.toUpperCase();
        contacts[index].cellphone = contacts[index].cellphone.replace(/(\d{2})?(\d{2})?(\d{5})(\d{4})/,"+$1 ($2) $3-$4");
    };

    return contacts;
};