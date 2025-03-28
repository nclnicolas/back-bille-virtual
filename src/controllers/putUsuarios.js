const { request, response } = require("express");
const { dbConnection } = require("../dbConnection/connection");
const Usuario = require("../models/usuarios");

const putUsuarios = async (req = request, res = response) => {
  try {
    await dbConnection();
    const { email } = req.params;
    const { avatar, saldo } = req.body;

    const updateFields = {};

    if (avatar) {
      updateFields.avatar = avatar;
    }

    if (saldo !== undefined) {
      updateFields.saldo = saldo;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      });
    }

    const usuario = await Usuario.findOneAndUpdate({ email }, updateFields, {
      new: true,
    });

    if (!usuario) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      message: "Usuario actualizado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error: error?.message,
    });
  }
};

module.exports = putUsuarios;
