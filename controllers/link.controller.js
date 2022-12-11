import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });

        return res.json({ links });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece el id" });

        return res.json({ link });
    } catch (e) {
        console.log(e);
        if (e.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id inválido" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const createLink = async (req, res) => {
    try {
        let { longLink } = req.body;

        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink;
        }

        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });

        const newLink = await link.save();

        return res.status(201).json({ newLink });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece el id" });

        await link.remove();

        return res.json({ link });
    } catch (e) {
        console.log(e);
        if (e.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id inválido" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};
