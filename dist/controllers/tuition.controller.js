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
exports.TuitionController = void 0;
const Tuition_1 = require("../models/Tuition");
class TuitionController {
    getAllTuitions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tuitions = yield Tuition_1.Tuition.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ tuitions });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching tuitions" });
            }
        });
    }
    getTuitionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const tuition = yield Tuition_1.Tuition.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (tuition) {
                    res.status(200).json({ tuition });
                }
                else {
                    res.status(404).json({ error: "Tuition not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching tuition" });
            }
        });
    }
    createTuition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { registrationDate, city, payment, carId, status } = req.body;
            try {
                const body = {
                    registrationDate,
                    city,
                    payment,
                    carId,
                    status,
                };
                const newTuition = yield Tuition_1.Tuition.create(Object.assign({}, body));
                res.status(201).json(newTuition);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateTuition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { registrationDate, city, payment, carId, status } = req.body;
            try {
                const body = {
                    registrationDate,
                    city,
                    payment,
                    carId,
                    status,
                };
                const tuitionExist = yield Tuition_1.Tuition.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (tuitionExist) {
                    yield tuitionExist.update(body);
                    res.status(200).json(tuitionExist);
                }
                else {
                    res.status(404).json({ error: "Tuition not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteTuition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const tuitionToDelete = yield Tuition_1.Tuition.findOne({
                    where: { id: pk },
                });
                if (tuitionToDelete) {
                    yield tuitionToDelete.destroy();
                    res.status(200).json({ message: "Tuition deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Tuition not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting tuition" });
            }
        });
    }
    deleteTuitionAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const tuitionToUpdate = yield Tuition_1.Tuition.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (tuitionToUpdate) {
                    yield tuitionToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Tuition marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Tuition not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking tuition as inactive" });
            }
        });
    }
}
exports.TuitionController = TuitionController;
