const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UsuariosSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  dni: Number,
  fechaNac: String,
  pass: String,
  avatar: { type: String, required: false },
  saldo: { type: Number, default: 0 },
  verify: Boolean,
});

UsuariosSchema.methods.toJSON = function () {
  const { __v, _id, verify, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

const Usuario = model("userbillevirtual", UsuariosSchema);

module.exports = Usuario;
