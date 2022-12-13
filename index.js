import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "./database/connect.js";
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

//Dominios que se van a aceptar para consumir backend
const whiteList = [process.env.ORIGIN1];

app.use(
    cors({
        origin: function (origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback("Error de CORS: dominio no autorizado");
        },
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/", redirectRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("http://localhost:" + PORT));
