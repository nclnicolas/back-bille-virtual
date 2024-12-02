const express = require("express");
const getDatosUsuarios = require("../controllers/getDatosUsuarios");
const postEnvioEmail = require("../controllers/postEnvioEmail");
const postRegisterUser = require("../controllers/postRegisterUser");
const putUsuarios = require("../controllers/putUsuarios");

const router = express.Router();

//router.get("/", async (req, res) => {
  //res.send("CONECTADO AL SERVICIO");
//});

router.get("/datos/usuarios", getDatosUsuarios);

router.post("/register/user", postRegisterUser);

router.put('/datos/usuarios/:email', putUsuarios);

router.post("/send-email", postEnvioEmail);

//router.delete("/datos/usuarios/:id", validarCampos, deleteUsuario);

module.exports = router;
