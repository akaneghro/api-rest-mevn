import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) throw new Error("No existe token");

        const payload = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = payload.uid;

        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: e.message });
    }
};
