// Libs
import "reflect-metadata";
import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

// project files
import { router } from "./routes";
import swaggerDocs from "./swagger.json";
import { errorHandling } from "./middlewares/main";

// load all env variables
dotenv.config();

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.use(errorHandling);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});             