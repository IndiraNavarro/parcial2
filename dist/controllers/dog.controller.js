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
exports.DogController = void 0;
const Dog_1 = require("../models/Dog");
class DogController {
    getAllDogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dogs = yield Dog_1.Dog.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ dogs });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching dogs" });
            }
        });
    }
    getDogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const dog = yield Dog_1.Dog.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (dog) {
                    res.status(200).json({ dog });
                }
                else {
                    res.status(404).json({ error: "Dog not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching dog" });
            }
        });
    }
    createDog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { breed, birthDate, color, vaccinated, status } = req.body;
            try {
                const body = {
                    breed,
                    birthDate,
                    color,
                    vaccinated,
                    status,
                };
                const newDog = yield Dog_1.Dog.create(Object.assign({}, body));
                res.status(201).json(newDog);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateDog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { breed, birthDate, color, vaccinated, status } = req.body;
            try {
                const body = {
                    breed,
                    birthDate,
                    color,
                    vaccinated,
                    status,
                };
                const dogExist = yield Dog_1.Dog.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (dogExist) {
                    yield dogExist.update(body);
                    res.status(200).json(dogExist);
                }
                else {
                    res.status(404).json({ error: "Dog not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteDog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const dogToDelete = yield Dog_1.Dog.findOne({
                    where: { id: pk },
                });
                if (dogToDelete) {
                    yield dogToDelete.destroy();
                    res.status(200).json({ message: "Dog deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Dog not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting dog" });
            }
        });
    }
    deleteDogAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const dogToUpdate = yield Dog_1.Dog.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (dogToUpdate) {
                    yield dogToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Dog marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Dog not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking dog as inactive" });
            }
        });
    }
}
exports.DogController = DogController;
