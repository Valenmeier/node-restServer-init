import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "../routes/usuarios.js";
import authRouter from "../routes/auth.js";
import { dbConnection } from "../database/config.js";
dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Paths
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    // Conectar DB
    this.conectarDB();
    //Middleware
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
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
    this.app.use(this.authPath, authRouter);
    this.app.use(this.usuariosPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}
