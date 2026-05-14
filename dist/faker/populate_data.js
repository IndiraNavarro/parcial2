"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const Adoption_1 = require("../models/Adoption");
const Car_1 = require("../models/Car");
const Dog_1 = require("../models/Dog");
const Tuition_1 = require("../models/Tuition");
const loadFaker = () => __awaiter(void 0, void 0, void 0, function* () {
    const dynamicImport = new Function("specifier", "return import(specifier)");
    const { faker } = (yield dynamicImport("@faker-js/faker"));
    return faker;
});
const dogBreeds = [
    "Labrador Retriever",
    "Golden Retriever",
    "Pastor Aleman",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Boxer",
    "Dachshund",
    "Border Collie",
    "Schnauzer",
];
const carClasses = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Pickup",
    "Coupe",
    "Convertible",
    "Van",
    "Wagon",
];
const createMoney = (faker, min, max) => {
    return Number(faker.finance.amount({ min, max, dec: 2 }));
};
function createFakeData() {
    return __awaiter(this, void 0, void 0, function* () {
        const faker = yield loadFaker();
        yield db_1.sequelize.authenticate();
        yield db_1.sequelize.sync({ force: false });
        for (let i = 0; i < 50; i++) {
            yield Dog_1.Dog.create({
                breed: faker.helpers.arrayElement(dogBreeds),
                birthDate: faker.date.past({ years: 12 }),
                color: faker.color.human(),
                vaccinated: faker.datatype.boolean(),
                status: "ACTIVE",
            });
        }
        for (let i = 0; i < 30; i++) {
            yield Car_1.Car.create({
                brand: faker.vehicle.manufacturer(),
                class: faker.helpers.arrayElement(carClasses),
                model: faker.vehicle.model(),
                displacement: faker.number.int({ min: 900, max: 6000 }),
                capacity: faker.number.int({ min: 2, max: 8 }),
                status: "ACTIVE",
            });
        }
        const dogs = yield Dog_1.Dog.findAll();
        for (let i = 0; i < 80; i++) {
            const dog = faker.helpers.arrayElement(dogs);
            yield Adoption_1.Adoption.create({
                adoptionDate: faker.date.past({ years: 2 }),
                identificationNumber: faker.string.numeric({ length: { min: 7, max: 10 } }),
                adopterName: faker.person.fullName(),
                value: createMoney(faker, 50000, 800000),
                dogId: dog.id,
                status: "ACTIVE",
            });
        }
        const cars = yield Car_1.Car.findAll();
        for (let i = 0; i < 60; i++) {
            const car = faker.helpers.arrayElement(cars);
            yield Tuition_1.Tuition.create({
                registrationDate: faker.date.past({ years: 3 }),
                city: faker.location.city(),
                payment: createMoney(faker, 200000, 2500000),
                carId: car.id,
                status: "ACTIVE",
            });
        }
    });
}
createFakeData()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Datos falsos creados exitosamente");
    yield db_1.sequelize.close();
}))
    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
    console.error("Error al crear datos falsos:", error);
    yield db_1.sequelize.close();
    process.exit(1);
}));
