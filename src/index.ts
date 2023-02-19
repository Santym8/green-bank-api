//----------Configurations----------
import express from "express";
import * as dotenv from "dotenv";
// import { DataBase } from "./config/DataBase";

//------------Midlewares-----------
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//------------Routes--------
import { IController } from "./utils/interfaces/IController";
import { IUrlController } from "./utils/interfaces/IUrlController";
import { TaxonomyRoutes } from "./modules/taxonomy/Routes";
import { UsuariosRoutes } from "./modules/usuarios/Routes";
import { FromulariosRoutes } from "./modules/accesiones/routes/FromularioRoutes";
import { PasaporteRoutes } from "./modules/accesiones/routes/PasaporteRoutes";
import { ProtocolosRoutes } from "./modules/accesiones/routes/ProtocolosRoutes";

export class Server {
  private app: express.Application;

  private urlsControllers: IUrlController[] = [
    {
      url: "/api/taxonomia",
      controller: new TaxonomyRoutes(),
    },
    {
      url: "/api/usuario",
      controller: new UsuariosRoutes(),
    },
    {
      url: "/api/accesiones",
      controller: new FromulariosRoutes(),
    },
    {
      url: "/api/accesiones",
      controller: new PasaporteRoutes(),
    },
    {
      url: "/api/accesiones",
      controller: new ProtocolosRoutes(),
    },
  ];

  constructor() {
    this.app = express();
    this.config();
  }

  //------------------------Config--------------------
  private addRouters() {
    this.app.get("/", (req, res) => res.send("WORKS!"));
    this.urlsControllers.forEach((urlController) => {
      this.app.use(urlController.url, urlController.controller.getRouter());
    });
  }

  private addMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(cors());
  }

  private async config() {
    dotenv.config();
    this.app.set("port", process.env.PORT || 3000);
    this.addMiddlewares();
    this.addRouters();
  }

  //-------------Start----------------
  public start() {
    let port = this.app.get("port");
    this.app.listen(port, () => console.log("Server on port ", port));
  }
}

const server = new Server();
server.start();
