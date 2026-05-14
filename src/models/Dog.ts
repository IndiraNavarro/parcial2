import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface DogI {
  id?: number;
  breed: string;
  birthDate: Date;
  color: string;
  vaccinated: boolean;
  status: "ACTIVE" | "INACTIVE";
}

export class Dog extends Model implements DogI {
  public id!: number;
  public breed!: string;
  public birthDate!: Date;
  public color!: string;
  public vaccinated!: boolean;
  public status!: "ACTIVE" | "INACTIVE";
}

Dog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Breed cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Breed must be between 2 and 100 characters",
        },
      },
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "birth_date",
      validate: {
        isDate: {
          args: true,
          msg: "Birth date must be a valid date",
        },
        notNull: {
          msg: "Birth date is required",
        },
      },
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Color cannot be empty" },
        len: {
          args: [2, 50],
          msg: "Color must be between 2 and 50 characters",
        },
      },
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "Vaccinated value is required",
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
    modelName: "Dog",
    tableName: "dogs",
    timestamps: false,
  }
);