"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const adoption_1 = require("./adoption");
const car_1 = require("./car");
const dog_1 = require("./dog");
const tuition_1 = require("./tuition");
class Routes {
    constructor() {
        // agrega tus rutas aquí de la siguiente manera
        this.dogRoutes = new dog_1.DogRoutes();
        this.adoptionRoutes = new adoption_1.AdoptionRoutes();
        this.carRoutes = new car_1.CarRoutes();
        this.tuitionRoutes = new tuition_1.TuitionRoutes();
    }
}
exports.Routes = Routes;
