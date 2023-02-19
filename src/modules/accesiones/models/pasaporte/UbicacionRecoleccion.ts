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

export class UbicacionRecoleccion extends Model<
  InferAttributes<UbicacionRecoleccion>,
  InferCreationAttributes<UbicacionRecoleccion>
> {
  declare ubicacionRecoleccionId: CreationOptional<number>;
  declare ubicacionRecoleccionGrupoEtnico: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoIdioma: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoPais: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoProvincia: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoCanton: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoParroquia: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoLocalidad: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoNombrePredio: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoPropietario: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoLocalizacion: CreationOptional<string>;
  declare ubicacionRecoleccionGrupoLatitud: CreationOptional<number>;
  declare ubicacionRecoleccionGrupoLongitud: CreationOptional<number>;
  declare ubicacionRecoleccionGrupoAltitud: CreationOptional<number>;
  declare accesionId: ForeignKey<Accesion["accesionId"]>;
}

UbicacionRecoleccion.init(
  {
    ubicacionRecoleccionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ubicacionRecoleccionGrupoEtnico: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoIdioma: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoPais: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoProvincia: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoCanton: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoParroquia: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoLocalidad: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoNombrePredio: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoPropietario: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoLocalizacion: {
      type: DataTypes.STRING(50),
    },
    ubicacionRecoleccionGrupoLatitud: {
      type: DataTypes.FLOAT,
    },
    ubicacionRecoleccionGrupoLongitud: {
      type: DataTypes.FLOAT,
    },
    ubicacionRecoleccionGrupoAltitud: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "UbicacionRecoleccion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(UbicacionRecoleccion, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
UbicacionRecoleccion.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

UbicacionRecoleccion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla UbicacionRecoleccion actualizada");
  });
