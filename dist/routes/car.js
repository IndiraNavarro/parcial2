"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const car_controller_1 = require("../controllers/car.controller");
class CarRoutes {
    constructor() {
        this.controller = new car_controller_1.CarController();
    }
    routes(app) {
        app.route("/api/car/public")
            .get(this.controller.getAllCars)
            .post(this.controller.createCar);
        app.route("/api/car/public/:id")
            .get(this.controller.getCarById)
            .patch(this.controller.updateCar)
            .delete(this.controller.deleteCar);
        app.route("/api/car/public/:id/logic")
            .delete(this.controller.deleteCarAdv);
    }
}
exports.CarRoutes = CarRoutes;
