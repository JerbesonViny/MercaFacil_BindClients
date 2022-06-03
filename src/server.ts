import "reflect-metadata";
import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";

import { router } from "./routes";
import { errorHandling } from "./middlewares/main";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandling);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});             