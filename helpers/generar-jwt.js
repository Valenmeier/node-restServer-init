import jwt from "jsonwebtoken";

export const generarJWT = (uid = "") => {
    try {
        const payload = { uid };
        const secret = process.env.SECRETORPRIVATEKEY;
        const options = { expiresIn: "4h" };
        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (err) {
        console.log(err);
        throw new Error("No se pudo generar el token");
    }
};
