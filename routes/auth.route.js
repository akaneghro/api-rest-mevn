import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controller.js";
import { validationResultMid } from "../middlewares/validationResultMid.js";

const router = express.Router();

router.post(
    "/register",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
        body("password", "Formato de password incorrecto").custom(
            (value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error("No coinciden las contraseñas");
                }
                return value;
            }
        ),
    ],
    validationResultMid,
    register
);

router.post(
    "/login",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
    ],
    validationResultMid,
    login
);

export default router;
