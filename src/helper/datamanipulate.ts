import { Contact } from "../entity/main";

// Funcao que aplica a mascara de celular exigida pela regra de negocio do cliente macapa e transforma os caracteres do nome em maiusculas
export function contactHandle(contacts: Contact[]) {
    for ( let index in contacts ) {
        contacts[index].name = contacts[index].name.toUpperCase();
        contacts[index].cellphone = contacts[index].cellphone.replace(/(\d{2})?(\d{2})?(\d{5})(\d{4})/,"+$1 ($2) $3-$4");
    };

    return contacts;
};