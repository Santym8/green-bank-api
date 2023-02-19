import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { InstitutosColector } from "../formularios/InstitutosColector";
import { Accesion } from "../Accesion";

export class Recoleccion extends Model<
  InferAttributes<Recoleccion>,
  InferCreationAttributes<Recoleccion>
> {
  declare recoleccionId: CreationOptional<number>;
  declare recoleccionNombre: CreationOptional<string>;
  declare recoleccionApellidos: CreationOptional<string>;
  declare recoleccionFecha: CreationOptional<Date>;

  declare institutoColectorId: ForeignKey<
    InstitutosColector["institutoColectorId"]
  >;
  declare accesionId: ForeignKey<Accesion["accesionId"]>;
}

Recoleccion.init(
  {
    recoleccionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recoleccionNombre: {
      type: DataTypes.STRING(50),
    },
    recoleccionApellidos: {
      type: DataTypes.STRING(50),
    },
    recoleccionFecha: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "Recoleccion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

InstitutosColector.hasMany(Recoleccion, {
  foreignKey: "institutoColectorId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Recoleccion.belongsTo(InstitutosColector, {
  foreignKey: "institutoColectorId",
});

Accesion.hasOne(Recoleccion, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Recoleccion.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Recoleccion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Recoleccion actualizada");
  });
