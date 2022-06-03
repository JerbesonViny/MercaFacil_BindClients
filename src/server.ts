import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import { router } from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});             