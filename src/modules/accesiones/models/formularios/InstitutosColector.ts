import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class InstitutosColector extends Model<
  InferAttributes<InstitutosColector>,
  InferCreationAttributes<InstitutosColector>
> {
  declare institutoColectorId: CreationOptional<number>;
  declare institutoColectorNombre: string;
}

InstitutosColector.init(
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

InstitutosColector.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla InstitutosColector actualizada");
  });
