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
  declare ubicacionRecoleccionGrupoEtnico: string;
  declare ubicacionRecoleccionGrupoIdioma: string;
  declare ubicacionRecoleccionGrupoPais: string;
  declare ubicacionRecoleccionGrupoProvincia: string;
  declare ubicacionRecoleccionGrupoCanton: string;
  declare ubicacionRecoleccionGrupoParroquia: string;
  declare ubicacionRecoleccionGrupoLocalidad: string;
  declare ubicacionRecoleccionGrupoNombrePredio: string;
  declare ubicacionRecoleccionGrupoPropietario: string;
  declare ubicacionRecoleccionGrupoLocalizacion: string;
  declare ubicacionRecoleccionGrupoLatitud: number;
  declare ubicacionRecoleccionGrupoLongitud: number;
  declare ubicacionRecoleccionGrupoAltitud: number;
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
    hooks: {
      beforeCreate: (data, options) => {
        data.ubicacionRecoleccionGrupoEtnico =
          data.ubicacionRecoleccionGrupoEtnico.toUpperCase();
        data.ubicacionRecoleccionGrupoIdioma =
          data.ubicacionRecoleccionGrupoIdioma.toUpperCase();
        data.ubicacionRecoleccionGrupoPais =
          data.ubicacionRecoleccionGrupoPais.toUpperCase();
        data.ubicacionRecoleccionGrupoProvincia =
          data.ubicacionRecoleccionGrupoProvincia.toUpperCase();
        data.ubicacionRecoleccionGrupoCanton =
          data.ubicacionRecoleccionGrupoCanton.toUpperCase();
        data.ubicacionRecoleccionGrupoParroquia =
          data.ubicacionRecoleccionGrupoParroquia.toUpperCase();
        data.ubicacionRecoleccionGrupoLocalidad =
          data.ubicacionRecoleccionGrupoLocalidad.toUpperCase();
        data.ubicacionRecoleccionGrupoNombrePredio =
          data.ubicacionRecoleccionGrupoNombrePredio.toUpperCase();
        data.ubicacionRecoleccionGrupoPropietario =
          data.ubicacionRecoleccionGrupoPropietario.toUpperCase();
        data.ubicacionRecoleccionGrupoLocalizacion =
          data.ubicacionRecoleccionGrupoLocalizacion.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.ubicacionRecoleccionGrupoEtnico =
          data.ubicacionRecoleccionGrupoEtnico.toUpperCase();
        data.ubicacionRecoleccionGrupoIdioma =
          data.ubicacionRecoleccionGrupoIdioma.toUpperCase();
        data.ubicacionRecoleccionGrupoPais =
          data.ubicacionRecoleccionGrupoPais.toUpperCase();
        data.ubicacionRecoleccionGrupoProvincia =
          data.ubicacionRecoleccionGrupoProvincia.toUpperCase();
        data.ubicacionRecoleccionGrupoCanton =
          data.ubicacionRecoleccionGrupoCanton.toUpperCase();
        data.ubicacionRecoleccionGrupoParroquia =
          data.ubicacionRecoleccionGrupoParroquia.toUpperCase();
        data.ubicacionRecoleccionGrupoLocalidad =
          data.ubicacionRecoleccionGrupoLocalidad.toUpperCase();
        data.ubicacionRecoleccionGrupoNombrePredio =
          data.ubicacionRecoleccionGrupoNombrePredio.toUpperCase();
        data.ubicacionRecoleccionGrupoPropietario =
          data.ubicacionRecoleccionGrupoPropietario.toUpperCase();
        data.ubicacionRecoleccionGrupoLocalizacion =
          data.ubicacionRecoleccionGrupoLocalizacion.toUpperCase();
      },
    },
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
