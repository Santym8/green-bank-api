const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize(
  "postgres://admin:HPcswMW9RhSwHrATearsT6orKiIRXoCk@dpg-cfle289gp3ju5h3kfo80-a.oregon-postgres.render.com/green_bank?sslmode=no-verify"
);
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
