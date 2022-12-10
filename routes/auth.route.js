import { Router } from "express";
import { body } from "express-validator";
import {
    infoUser,
    login,
    logout,
    refreshToken,
    register,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { validationResultMid } from "../middlewares/validationResultMid.js";

const router = Router();

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

router.get("/protected", requireToken, infoUser);

router.get("/refresh", refreshToken);

router.get("/logout", logout);

export default router;
