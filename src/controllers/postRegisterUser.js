const { request, response } = require("express");
const UsuarioBilleteraVirtual = require("../models/usuarios");
const { dbConnection } = require("../dbConnection/connection");

const postRegisterUser = async (req = request, res = response) => {
  try {
    await dbConnection();
    const { nombre, apellido, email, dni, pass, fechaNac } = req.body;

    const nuevoUsuario = new UsuarioBilleteraVirtual({
      nombre,
      apellido,
      email,
      dni,
      pass,
      fechaNac,
      avatar: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
      verify: true
    });

    if (
      nombre === undefined ||
      apellido === undefined ||
      email === undefined ||
      dni === undefined ||
      pass === undefined ||
      fechaNac === undefined
    ) {
      return res.status(400).json({
        msg: "Los campos son obligatorios",
      });
    }

    await nuevoUsuario.save();

    res.status(200).json({
      msg: "Carga Exitosa!!",
      nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un ERROR",
    });
  }
};

module.exports = postRegisterUser;
