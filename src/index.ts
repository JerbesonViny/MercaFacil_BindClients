import "reflect-metadata";
import { clientVarejao, clientMacapa } from "./data-source";


clientVarejao.initialize().then(() => {

}).catch((error) => {
    console.log(error);
});

clientMacapa.initialize().then(() => {

}).catch((error) => {
    console.log(error);
});
