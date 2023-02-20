const { Sequelize } = require("sequelize");
import { config } from "dotenv";

config();
export const sequelize = new Sequelize(process.env.DB, { logging: false });

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// export class DataBase {
//   static sequelize:any;

//   public static async configDataBase() {
//     try {
//       console.log('--------------------------------------')
//       DataBase.sequelize = new Sequelize(process.env.DB);
//       console.error("Database connected");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   }

// }
