import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, empresa, telefono, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Comercial Bautista" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `SOLICITUD DE COTIZACIÓN - ${nombre || empresa}`,
      replyTo: email,
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre / Empresa:</strong> ${nombre || empresa}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error enviando correo" });
  }
}
