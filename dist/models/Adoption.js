"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adoption = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Dog_1 = require("./Dog");
class Adoption extends sequelize_1.Model {
}
exports.Adoption = Adoption;
Adoption.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    adoptionDate: {
        type: sequelize_1.DataTypes.DATE,
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
        type: sequelize_1.DataTypes.STRING(30),
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
        type: sequelize_1.DataTypes.STRING(150),
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
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
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
        type: sequelize_1.DataTypes.INTEGER,
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
    modelName: "Adoption",
    tableName: "adoptions",
    timestamps: false,
});
Dog_1.Dog.hasMany(Adoption, {
    foreignKey: "dog_id",
    sourceKey: "id",
});
Adoption.belongsTo(Dog_1.Dog, {
    foreignKey: "dog_id",
    targetKey: "id",
});
