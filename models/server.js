import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes/usuarios.js";
dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Paths
    this.usuariosPath = "/api/usuarios";
    //Middleware
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}
