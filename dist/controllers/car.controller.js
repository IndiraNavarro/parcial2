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
exports.CarController = void 0;
const Car_1 = require("../models/Car");
class CarController {
    getAllCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield Car_1.Car.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ cars });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching cars" });
            }
        });
    }
    getCarById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const car = yield Car_1.Car.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (car) {
                    res.status(200).json({ car });
                }
                else {
                    res.status(404).json({ error: "Car not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching car" });
            }
        });
    }
    createCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand, class: carClass, model, displacement, capacity, status } = req.body;
            try {
                const body = {
                    brand,
                    class: carClass,
                    model,
                    displacement,
                    capacity,
                    status,
                };
                const newCar = yield Car_1.Car.create(Object.assign({}, body));
                res.status(201).json(newCar);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { brand, class: carClass, model, displacement, capacity, status } = req.body;
            try {
                const body = {
                    brand,
                    class: carClass,
                    model,
                    displacement,
                    capacity,
                    status,
                };
                const carExist = yield Car_1.Car.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (carExist) {
                    yield carExist.update(body);
                    res.status(200).json(carExist);
                }
                else {
                    res.status(404).json({ error: "Car not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const carToDelete = yield Car_1.Car.findOne({
                    where: { id: pk },
                });
                if (carToDelete) {
                    yield carToDelete.destroy();
                    res.status(200).json({ message: "Car deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Car not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting car" });
            }
        });
    }
    deleteCarAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const carToUpdate = yield Car_1.Car.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (carToUpdate) {
                    yield carToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Car marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Car not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking car as inactive" });
            }
        });
    }
}
exports.CarController = CarController;
