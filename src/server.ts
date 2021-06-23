import "reflect-metadata";
import express from "express";
import { router } from "./routes";

import "./database";

const app = express();

app.get('/test', (request, response)=> {
  return response.send("ola")
})

app.use(express.json());

app.use(router);

app.listen(3000, () => console.log("Server is running"));