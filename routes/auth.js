import { Router } from "express";
import { check } from "express-validator";
import { loginController } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  loginController
);

export default router;
