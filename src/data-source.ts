import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { MacapaContacts, VarejaoContacts } from "./entity/Contact";

dotenv.config();

export const clientVarejao = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [VarejaoContacts],
    migrations: [],
    subscribers: []
});

export const clientMacapa = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [MacapaContacts],
    migrations: []
})