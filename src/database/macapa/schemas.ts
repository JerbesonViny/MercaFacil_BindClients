import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200, nullable: false})
    nome: string

    @Column({length: 20, nullable: false})
    celular: string
}

export default { Contacts }