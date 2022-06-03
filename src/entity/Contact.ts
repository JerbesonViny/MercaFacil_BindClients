import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "contacts"})
export class VarejaoContacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    name: string

    @Column({length: 13, nullable: false})
    cellphone: string
}

@Entity({name: "contacts"})
export class MacapaContacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    name: string

    @Column({length: 13, nullable: false})
    cellphone: string
}