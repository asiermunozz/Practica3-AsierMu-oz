import { Router } from "express";
import { createTebeo, deleteTebeo, getTebeoId, getTebeos, putTebeo } from "../controllers/tebeo.controllers.js";

const router = Router();

router.get("/", getTebeos);
router.get("/:id", getTebeoId);
router.post("/", createTebeo);
router.delete("/:id", deleteTebeo);
router.put("/:id", putTebeo); // Algunos profesores usan PATCH en vez de PUT

export default router;