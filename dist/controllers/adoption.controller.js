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
exports.AdoptionController = void 0;
const Adoption_1 = require("../models/Adoption");
class AdoptionController {
    getAllAdoptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adoptions = yield Adoption_1.Adoption.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ adoptions });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching adoptions" });
            }
        });
    }
    getAdoptionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const adoption = yield Adoption_1.Adoption.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (adoption) {
                    res.status(200).json({ adoption });
                }
                else {
                    res.status(404).json({ error: "Adoption not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching adoption" });
            }
        });
    }
    createAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adoptionDate, identificationNumber, adopterName, value, dogId, status, } = req.body;
            try {
                const body = {
                    adoptionDate,
                    identificationNumber,
                    adopterName,
                    value,
                    dogId,
                    status,
                };
                const newAdoption = yield Adoption_1.Adoption.create(Object.assign({}, body));
                res.status(201).json(newAdoption);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { adoptionDate, identificationNumber, adopterName, value, dogId, status, } = req.body;
            try {
                const body = {
                    adoptionDate,
                    identificationNumber,
                    adopterName,
                    value,
                    dogId,
                    status,
                };
                const adoptionExist = yield Adoption_1.Adoption.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (adoptionExist) {
                    yield adoptionExist.update(body);
                    res.status(200).json(adoptionExist);
                }
                else {
                    res.status(404).json({ error: "Adoption not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const adoptionToDelete = yield Adoption_1.Adoption.findOne({
                    where: { id: pk },
                });
                if (adoptionToDelete) {
                    yield adoptionToDelete.destroy();
                    res.status(200).json({ message: "Adoption deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Adoption not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting adoption" });
            }
        });
    }
    deleteAdoptionAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const adoptionToUpdate = yield Adoption_1.Adoption.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (adoptionToUpdate) {
                    yield adoptionToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Adoption marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Adoption not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking adoption as inactive" });
            }
        });
    }
}
exports.AdoptionController = AdoptionController;
