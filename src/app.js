import express from "express";
import path from "path";
import routes from "./routes";
import "./database/load";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use("/arquivos", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;