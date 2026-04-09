import express from "express";
import { addSchool, listSchools } from "../controller/Schoolcontroller.js";
import {validateAddSchool , validateListSchools } from "../middleware/validate.js";

const router = express.Router();

// post addSchool-  validate middleware first then go to controller
router.post("/addSchool", validateAddSchool , addSchool);

// get listSchools -validate middleware first then go to controller
router.get("/listSchools", validateListSchools , listSchools);

export default router;