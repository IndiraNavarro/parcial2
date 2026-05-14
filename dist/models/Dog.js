"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
class Dog extends sequelize_1.Model {
}
exports.Dog = Dog;
Dog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    breed: {
        type: sequelize_1.DataTypes.STRING(100),
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
        type: sequelize_1.DataTypes.DATE,
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
        type: sequelize_1.DataTypes.STRING(50),
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
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: {
                msg: "Vaccinated value is required",
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
    modelName: "Dog",
    tableName: "dogs",
    timestamps: false,
});
