import { response } from "express";

export const usuariosGet = (req, res = response) => {
  const { q, nombre = "no name", apiKey, page=1, limit } = req.query;
  res.status(403).json({
    msg: "Get Api - Controlador ",
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

export const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.status(500).json({
    msg: "put Api - Controlador",
    id,
  });
};

export const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post Api - Controlador",
    nombre,
    edad,
  });
};

export const usuariosDelete = (req, res = response) => {
  res.status(403).json({
    msg: "delete Api - Controlador",
  });
};
export const usuariosPatch = (req, res = response) => {
  res.status(403).json({
    msg: "patch Api - Controlador",
  });
};
