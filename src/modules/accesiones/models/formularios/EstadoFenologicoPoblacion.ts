import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class EstadoFenologicoPoblacion extends Model<
  InferAttributes<EstadoFenologicoPoblacion>,
  InferCreationAttributes<EstadoFenologicoPoblacion>
> {
  declare estadoFenologicoPoblacionId: CreationOptional<number>;
  declare estadoFenologicoPoblacionNombre: string;
}

EstadoFenologicoPoblacion.init(
  {
    estadoFenologicoPoblacionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estadoFenologicoPoblacionNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.estadoFenologicoPoblacionNombre =
          data.estadoFenologicoPoblacionNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.estadoFenologicoPoblacionNombre =
          data.estadoFenologicoPoblacionNombre.toUpperCase();
      },
    },
    tableName: "EstadoFenologicoPoblacion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

EstadoFenologicoPoblacion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla EstadoFenologicoPoblacion actualizada");
  });
