const { Sequelize } = require('sequelize');

export class DataBase {

    public static async configDataBase() {
        const sequelize = new Sequelize(process.env.DB)
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
}
