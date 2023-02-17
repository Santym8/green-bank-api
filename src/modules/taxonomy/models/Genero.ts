import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Familia } from "./Familia";

export class Genero extends Model<
  InferAttributes<Genero>,
  InferCreationAttributes<Genero>
> {
  declare generoId: CreationOptional<number>;
  declare generoNombre: string;
  declare familiaId: ForeignKey<Familia["familiaId"]>;
}

Genero.init(
  {
    generoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    generoNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (genero, options) => {
        genero.generoNombre = genero.generoNombre.toUpperCase();
      },
      beforeUpdate: (genero, options) => {
        genero.generoNombre = genero.generoNombre.toUpperCase();
      },
    },
    tableName: "Generos",
    paranoid: true,
    freezeTableName: true,
    sequelize,
  }
);

Familia.hasMany(Genero, {
  foreignKey: "familiaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Genero.belongsTo(Familia, {
  foreignKey: "familiaId",
});

// Genero.belongsTo(Familia);

Genero.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Genero actualizada");
  });
