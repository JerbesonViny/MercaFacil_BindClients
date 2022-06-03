export interface Contact {
    name: string;
    cellphone: string;
}

export interface IRequestContacts {
    contacts: Contact[]
}

export interface Payload {
    id: number;
    type_client: number;
}