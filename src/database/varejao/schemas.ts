import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
export class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    nome: string

    @Column({length: 13, nullable: false})
    celular: string
}

export default { Contacts }