import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from 'cors'
import { Routes } from "./routes";



createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json());

    for (let route of Routes) {
        app[route.method](route.path, route.handler);
    }


    app.listen(4000);

    console.log("Express server has started on port 3000. Open http://localhost:4000/users to see results");

}).catch(error => console.log(error));
