import { Router } from "express";
import { authorize, verifyJWT } from "../middlewares/authmiddleware.js";
import { assignTask, getAssignedTasks } from "../controllers/task.controller.js";

const router = Router()

router.route("/manager/tasks").post(verifyJWT, authorize("farm_manager"), assignTask)
router.route("/technician/tasks").get(verifyJWT, authorize("farm_technician"), getAssignedTasks)

export default router