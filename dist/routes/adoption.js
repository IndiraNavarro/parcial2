"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRoutes = void 0;
const adoption_controller_1 = require("../controllers/adoption.controller");
class AdoptionRoutes {
    constructor() {
        this.controller = new adoption_controller_1.AdoptionController();
    }
    routes(app) {
        app.route("/api/adoption/public")
            .get(this.controller.getAllAdoptions)
            .post(this.controller.createAdoption);
        app.route("/api/adoption/public/:id")
            .get(this.controller.getAdoptionById)
            .patch(this.controller.updateAdoption)
            .delete(this.controller.deleteAdoption);
        app.route("/api/adoption/public/:id/logic")
            .delete(this.controller.deleteAdoptionAdv);
    }
}
exports.AdoptionRoutes = AdoptionRoutes;
