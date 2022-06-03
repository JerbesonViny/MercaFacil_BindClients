import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import varejaoSchemas from "./database/varejao/schemas";
import macapaSchemas from "./database/macapa/schemas"

dotenv.config();

export const clientVarejao = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [varejaoSchemas.Contacts],
    migrations: []
});

export const clientMacapa = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [macapaSchemas.Contacts],
    migrations: []
})