import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Car } from "./Car";

export interface TuitionI {
  id?: number;
  registrationDate: Date;
  city: string;
  payment: number;
  carId: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Tuition extends Model implements TuitionI {
  public id!: number;
  public registrationDate!: Date;
  public city!: string;
  public payment!: number;
  public carId!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Tuition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "registration_date",
      validate: {
        isDate: {
          args: true,
          msg: "Registration date must be a valid date",
        },
        notNull: {
          msg: "Registration date is required",
        },
      },
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "City cannot be empty" },
        len: {
          args: [2, 100],
          msg: "City must be between 2 and 100 characters",
        },
      },
    },
    payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Payment must be a decimal number" },
        min: {
          args: [0],
          msg: "Payment cannot be negative",
        },
      },
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "car_id",
      references: {
        model: "cars",
        key: "id",
      },
      validate: {
        isInt: { msg: "Car id must be an integer" },
        notNull: {
          msg: "Car id is required",
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
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
  }
);

Car.hasMany(Tuition, {
  foreignKey: "car_id",
  sourceKey: "id",
});

Tuition.belongsTo(Car, {
  foreignKey: "car_id",
  targetKey: "id",
});