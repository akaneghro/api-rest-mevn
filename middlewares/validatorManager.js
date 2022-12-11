import axios from "axios";
import { body, param, validationResult } from "express-validator";

export const validationResultMid = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const bodyRegisterValidator = [
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
    validationResultMid,
];

export const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
    validationResultMid,
];

export const paramLinkValidator = [
    param("id", "Formato incorrecto (ExpressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultMid,
];

export const bodyLinkValidator = [
    body("longLink", "Formato del link incorrecto").trim().notEmpty(),
    //!Está fallando axios.get(value) -> unexpected end of file
    //Método personalizado para comprobar con axios si la ruta es una web
    // .custom(async (value) => {
    //     try {
    //         if (!value.startsWith("https://")) {
    //             value = "https://" + value;
    //         }

    //         await axios.get(value);
    //         console.log("hola");

    //         return value;
    //     } catch (e) {
    //         console.log(e.message);
    //         throw new Error("Not Found longLink");
    //     }
    // }),
    validationResultMid,
];
