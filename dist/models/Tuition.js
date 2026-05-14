"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuition = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Car_1 = require("./Car");
class Tuition extends sequelize_1.Model {
}
exports.Tuition = Tuition;
Tuition.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    registrationDate: {
        type: sequelize_1.DataTypes.DATE,
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
        type: sequelize_1.DataTypes.STRING(100),
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
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
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
        type: sequelize_1.DataTypes.INTEGER,
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
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "ACTIVE",
        validate: {
            isIn: {
                args: [["ACTIVE", "INACTIVE"]],
                msg: "Status must be ACTIVE or INACTIVE",
            },
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
});
Car_1.Car.hasMany(Tuition, {
    foreignKey: "car_id",
    sourceKey: "id",
});
Tuition.belongsTo(Car_1.Car, {
    foreignKey: "car_id",
    targetKey: "id",
});
