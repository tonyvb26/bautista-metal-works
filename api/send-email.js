import nodemailer from "nodemailer";

const rateLimit = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const now = Date.now();
  const windowTime = 60 * 60 * 1000; // 1 hora
  const maxRequests = 3;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const requests = rateLimit.get(ip).filter(
    (timestamp) => now - timestamp < windowTime
  );

  if (requests.length >= maxRequests) {
    return res.status(429).json({
      message: "Has alcanzado el límite de envíos. Intenta más tarde.",
    });
  }

  requests.push(now);
  rateLimit.set(ip, requests);

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
