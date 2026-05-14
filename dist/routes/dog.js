"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogRoutes = void 0;
const dog_controller_1 = require("../controllers/dog.controller");
class DogRoutes {
    constructor() {
        this.controller = new dog_controller_1.DogController();
    }
    routes(app) {
        app.route("/api/dog/public")
            .get(this.controller.getAllDogs)
            .post(this.controller.createDog);
        app.route("/api/dog/public/:id")
            .get(this.controller.getDogById)
            .patch(this.controller.updateDog)
            .delete(this.controller.deleteDog);
        app.route("/api/dog/public/:id/logic")
            .delete(this.controller.deleteDogAdv);
    }
}
exports.DogRoutes = DogRoutes;
