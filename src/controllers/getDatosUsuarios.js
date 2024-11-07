const { request, response } = require("express");
const {dbConnection} = require('../dbConnection/connection');
const Usuario = require('../models/usuarios')

const getDatosUsuarios = async(req = request, res = response) => {
  try {
    console.log('Conectando.........');
    await dbConnection();
    console.log('CONEXION EXITOSA');

    const query = { verify: true }

    const [ allUsuarios ] = await Promise.all([
      Usuario.find(query)
    ])
    
      res.json({allUsuarios})

  } catch (error) {
    res.status(500).json({
      msg: "Ocurrio un ERROR getDatosUsuarios",
      error
    });
  }
};

module.exports = getDatosUsuarios