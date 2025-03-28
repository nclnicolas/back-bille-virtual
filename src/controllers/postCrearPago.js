const { request, response } = require("express");
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

const postCrearPago = async (req = request, res = response) => {
  try {
    const { monto, email } = req.body;

    const preference = {
      items: [
        {
          title: "Depósito en tu billetera",
          unit_price: parseFloat(monto),
          quantity: 1,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: email, // Email del usuario
      },
      payment_methods: {
        excluded_payment_types: [{ id: "credit_card" }], // Solo transferencias bancarias
        installments: 1,
      },
      back_urls: {
        success: "https://tuapp.com/exito",
        failure: "https://tuapp.com/error",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el pago",
    });
  }
};

module.exports = postCrearPago;
