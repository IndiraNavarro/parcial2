import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Dog } from "./Dog";

export interface AdoptionI {
  id?: number;
  adoptionDate: Date;
  identificationNumber: string;
  adopterName: string;
  value: number;
  dogId: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Adoption extends Model implements AdoptionI {
  public id!: number;
  public adoptionDate!: Date;
  public identificationNumber!: string;
  public adopterName!: string;
  public value!: number;
  public dogId!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Adoption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    adoptionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "adoption_date",
      validate: {
        isDate: {
          args: true,
          msg: "Adoption date must be a valid date",
        },
        notNull: {
          msg: "Adoption date is required",
        },
      },
    },
    identificationNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "identification_number",
      validate: {
        notEmpty: { msg: "Identification number cannot be empty" },
        len: {
          args: [5, 30],
          msg: "Identification number must be between 5 and 30 characters",
        },
      },
    },
    adopterName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "adopter_name",
      validate: {
        notEmpty: { msg: "Adopter name cannot be empty" },
        len: {
          args: [2, 150],
          msg: "Adopter name must be between 2 and 150 characters",
        },
      },
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Value must be a decimal number" },
        min: {
          args: [0],
          msg: "Value cannot be negative",
        },
      },
    },
    dogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "dog_id",
      references: {
        model: "dogs",
        key: "id",
      },
      validate: {
        isInt: { msg: "Dog id must be an integer" },
        notNull: {
          msg: "Dog id is required",
        },
      },
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "ACTIVE",
      validate: {
        isIn: {
          args: [["ACTIVE", "INACTIVE"]],
          msg: "Status must be ACTIVE or INACTIVE",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Adoption",
    tableName: "adoptions",
    timestamps: false,
  }
);

Dog.hasMany(Adoption, {
  foreignKey: "dog_id",
  sourceKey: "id",
});

Adoption.belongsTo(Dog, {
  foreignKey: "dog_id",
  targetKey: "id",
});