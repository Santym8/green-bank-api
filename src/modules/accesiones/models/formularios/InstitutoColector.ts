import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class InstitutoColector extends Model<
  InferAttributes<InstitutoColector>,
  InferCreationAttributes<InstitutoColector>
> {
  declare institutoColectorId: CreationOptional<number>;
  declare institutoColectorNombre: string;
}

InstitutoColector.init(
  {
    institutoColectorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    institutoColectorNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.institutoColectorNombre =
          data.institutoColectorNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.institutoColectorNombre =
          data.institutoColectorNombre.toUpperCase();
      },
    },
    tableName: "InstitutosColector",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

InstitutoColector.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla InstitutosColector actualizada");
  });
