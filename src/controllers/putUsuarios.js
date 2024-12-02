const { request, response } = require("express");
const { dbConnection } = require("../dbConnection/connection");
const Usuario = require("../models/usuarios");

const putUsuarios = async (req = request, res = response) => {
  try {
    await dbConnection();
    const { email } = req.params;
    const { avatar } = req.body;

    const usuario = await Usuario.findOneAndUpdate({ email }, { avatar }, { new: true });

    if (!usuario) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      message: "Avatar actualizado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error: error?.message
    });
  }
};

module.exports = putUsuarios;
