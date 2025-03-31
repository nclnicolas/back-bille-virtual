const { request, response } = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
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
        email: "ncl.enriquez@gmail.com", // Email del usuario
      },
      payment_methods: {
        installments: 1,
      },
      back_urls: {
        success:
          "https://4933-2800-810-42b-52d-7df3-30b3-b3d9-4c31.ngrok-free.app/exito",
        failure:
          "https://4933-2800-810-42b-52d-7df3-30b3-b3d9-4c31.ngrok-free.app/error",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    console.log(
      "🔍 Respuesta de Mercado Pago:",
      JSON.stringify(response.body, null, 2)
    );
    res.json({
      id: response.body.id,
      init_point: response.body.init_point,
      status: response.body.status,
    });
  } catch (error) {
    console.error(
      "Error al crear el pago:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error al crear el pago",
    });
  }
};

module.exports = postCrearPago;
