import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) throw { code: 11000 };

        user = new User({ email, password });

        await user.save();

        //jwt token

        return res.status(201).json({ ok: true });
    } catch (e) {
        console.log(e);
        if (e.code === 11000) {
            return res.status(400).json({ error: "Ya existe el usuario" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        const respuestaPassword = await user.comparePassword(password);

        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
