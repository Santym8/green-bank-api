import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class EstadoGermoplasma extends Model<
  InferAttributes<EstadoGermoplasma>,
  InferCreationAttributes<EstadoGermoplasma>
> {
  declare estadoGermoplasmaId: CreationOptional<number>;
  declare estadoGermoplasmaNombre: string;
}

EstadoGermoplasma.init(
  {
    estadoGermoplasmaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estadoGermoplasmaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.estadoGermoplasmaNombre = data.estadoGermoplasmaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.estadoGermoplasmaNombre = data.estadoGermoplasmaNombre.toUpperCase();
      },
    },
    tableName: "EstadoGermoplasma",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

EstadoGermoplasma.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla EstadoGermoplasma actualizada");
  });
