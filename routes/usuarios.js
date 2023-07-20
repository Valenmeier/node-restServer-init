import { Router } from "express";
import { check } from "express-validator";

import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.js";

// import { validarCampos } from "../middlewares/validar-campos.js";
// import { validarJWT } from "../middlewares/validar-jwt.js";
// import { esAdminRol, tieneRole } from "../middlewares/validar-roles.js";
import {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRole,
} from "../middlewares/index.js";

import {
  emailExiste,
  esRolValido,
  existeUsuarioId,
} from "../helpers/db-validators.js";

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id", "No es un ID válido").custom(existeUsuarioId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y más de 6 letras")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRol,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id", "No es un ID válido").custom(existeUsuarioId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

export default router;
