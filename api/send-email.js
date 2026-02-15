import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  // 🔥 AHORA COINCIDE CON EL FRONTEND
  const { name, email, phone, message } = req.body;

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
      subject: `SOLICITUD DE COTIZACIÓN - ${name}`,
      replyTo: email,
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error enviando correo" });
  }
}

