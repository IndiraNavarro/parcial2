import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface CarI {
  id?: number;
  brand: string;
  class: string;
  model: string;
  displacement: number;
  capacity: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Car extends Model implements CarI {
  public id!: number;
  public brand!: string;
  public class!: string;
  public model!: string;
  public displacement!: number;
  public capacity!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Brand cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Brand must be between 2 and 100 characters",
        },
      },
    },
    class: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Class cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Class must be between 2 and 100 characters",
        },
      },
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Model cannot be empty" },
        len: {
          args: [1, 100],
          msg: "Model must be between 1 and 100 characters",
        },
      },
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Displacement must be an integer" },
        min: {
          args: [1],
          msg: "Displacement must be greater than 0",
        },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Capacity must be an integer" },
        min: {
          args: [1],
          msg: "Capacity must be greater than 0",
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
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
  }
);