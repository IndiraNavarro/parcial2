"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuitionRoutes = void 0;
const tuition_controller_1 = require("../controllers/tuition.controller");
class TuitionRoutes {
    constructor() {
        this.controller = new tuition_controller_1.TuitionController();
    }
    routes(app) {
        app.route("/api/tuition/public")
            .get(this.controller.getAllTuitions)
            .post(this.controller.createTuition);
        app.route("/api/tuition/public/:id")
            .get(this.controller.getTuitionById)
            .patch(this.controller.updateTuition)
            .delete(this.controller.deleteTuition);
        app.route("/api/tuition/public/:id/logic")
            .delete(this.controller.deleteTuitionAdv);
    }
}
exports.TuitionRoutes = TuitionRoutes;
