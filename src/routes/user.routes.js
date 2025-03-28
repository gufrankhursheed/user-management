import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { authorize, verifyJWT } from "../middlewares/authmiddleware.js";

const router = Router()

router.route("/admin/users").get(verifyJWT, authorize("farm_admin"), getAllUsers)
router.route("/user/profile").get(verifyJWT, getUser)

export default router