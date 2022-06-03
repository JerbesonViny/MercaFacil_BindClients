import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    name: string

    @Column({length: 13, nullable: false})
    cellphone: string
}

export default { Contacts }