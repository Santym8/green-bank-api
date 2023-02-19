import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Accesion } from "../Accesion";
import { Luz } from "../formularios/Luz";

export class Clima extends Model<
  InferAttributes<Clima>,
  InferCreationAttributes<Clima>
> {
  declare climaId: CreationOptional<number>;
  declare climaTemperatura: number;
  declare climaHumedad: number;

  declare luzId: ForeignKey<Luz["luzId"]>;
}

Clima.init(
  {
    climaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    climaTemperatura: {
      type: DataTypes.FLOAT,
    },
    climaHumedad: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "Clima",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Clima, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Clima.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Luz.hasMany(Clima, {
  foreignKey: "luzId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Clima.belongsTo(Luz, {
  foreignKey: "luzId",
});

Clima.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Luz actualizada");
  });
