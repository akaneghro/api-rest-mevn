import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log("Conexión exitosa a mongodb");
} catch (e) {
    console.log("Error de conexión a mongodb: " + e);
}
