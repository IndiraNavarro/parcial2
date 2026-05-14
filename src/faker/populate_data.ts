import { sequelize } from "../database/db";
import { Adoption } from "../models/Adoption";
import { Car } from "../models/Car";
import { Dog } from "../models/Dog";
import { Tuition } from "../models/Tuition";

type Faker = typeof import("@faker-js/faker")["faker"];

const loadFaker = async (): Promise<Faker> => {
  const dynamicImport = new Function("specifier", "return import(specifier)");
  const { faker } = (await dynamicImport("@faker-js/faker")) as {
    faker: Faker;
  };

  return faker;
};

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

const createMoney = (faker: Faker, min: number, max: number): number => {
  return Number(faker.finance.amount({ min, max, dec: 2 }));
};

async function createFakeData(): Promise<void> {
  const faker = await loadFaker();

  await sequelize.authenticate();
  await sequelize.sync({ force: false });

  for (let i = 0; i < 50; i++) {
    await Dog.create({
      breed: faker.helpers.arrayElement(dogBreeds),
      birthDate: faker.date.past({ years: 12 }),
      color: faker.color.human(),
      vaccinated: faker.datatype.boolean(),
      status: "ACTIVE",
    });
  }

  for (let i = 0; i < 30; i++) {
    await Car.create({
      brand: faker.vehicle.manufacturer(),
      class: faker.helpers.arrayElement(carClasses),
      model: faker.vehicle.model(),
      displacement: faker.number.int({ min: 900, max: 6000 }),
      capacity: faker.number.int({ min: 2, max: 8 }),
      status: "ACTIVE",
    });
  }

  const dogs = await Dog.findAll();
  for (let i = 0; i < 80; i++) {
    const dog = faker.helpers.arrayElement(dogs);

    await Adoption.create({
      adoptionDate: faker.date.past({ years: 2 }),
      identificationNumber: faker.string.numeric({ length: { min: 7, max: 10 } }),
      adopterName: faker.person.fullName(),
      value: createMoney(faker, 50000, 800000),
      dogId: dog.id,
      status: "ACTIVE",
    });
  }

  const cars = await Car.findAll();
  for (let i = 0; i < 60; i++) {
    const car = faker.helpers.arrayElement(cars);

    await Tuition.create({
      registrationDate: faker.date.past({ years: 3 }),
      city: faker.location.city(),
      payment: createMoney(faker, 200000, 2500000),
      carId: car.id,
      status: "ACTIVE",
    });
  }
}

createFakeData()
  .then(async () => {
    console.log("Datos falsos creados exitosamente");
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error("Error al crear datos falsos:", error);
    await sequelize.close();
    process.exit(1);
  });
