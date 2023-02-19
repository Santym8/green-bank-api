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
  declare recoleccionNombre: string;
  declare recoleccionApellidos: string;
  declare createdAt: CreationOptional<Date>;
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
      allowNull: false,
    },
    recoleccionApellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdAt: DataTypes.DATEONLY,
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.recoleccionNombre = data.recoleccionNombre.toUpperCase();
        data.recoleccionApellidos = data.recoleccionApellidos.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.recoleccionNombre = data.recoleccionNombre.toUpperCase();
        data.recoleccionApellidos = data.recoleccionApellidos.toUpperCase();
      },
    },
    tableName: "Recoleccion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

InstitutosColector.hasMany(Recoleccion, {
  foreignKey: "institutosColectorId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Recoleccion.belongsTo(InstitutosColector, {
  foreignKey: "institutosColectorId",
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
