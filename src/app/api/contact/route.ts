import { NextResponse } from "next/server";
import { Resend } from "resend";

const requiredFields = ["nombre", "email", "url"] as const;

type ContactPayload = Record<string, string>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries()) as ContactPayload;

  for (const field of requiredFields) {
    if (!payload[field] || payload[field].trim().length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: `El campo ${field} es obligatorio`,
        },
        { status: 400 },
      );
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Introduce un correo válido",
      },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !resendFromEmail) {
    console.error("Contact form error: missing Resend configuration");
    return NextResponse.json(
      {
        ok: false,
        error: "Servicio de correo no disponible. Inténtalo más tarde.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);
  const recipientList = (process.env.CONTACT_NOTIFICATION_RECIPIENTS ??
    "victoriano@graphext.com,andres@graphext.com")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  const subject = `Nuevo lead Gatodato – ${payload.nombre}`;
  const leadDetails = Object.entries(payload)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const htmlBody = `
    <h2>Nuevo lead recibido</h2>
    <ul>
      ${Object.entries(payload)
        .map(
          ([key, value]) =>
            `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value ?? ""))}</li>`,
        )
        .join("")}
    </ul>
  `;

  const { data, error } = await resend.emails.send({
    from: resendFromEmail,
    to: recipientList,
    subject,
    text: `Nuevo lead recibido:\n\n${leadDetails}`,
    html: htmlBody,
    replyTo: payload.email,
  });

  if (error) {
    console.error("Contact form error: Resend send failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "No hemos podido enviar tu solicitud. Inténtalo más tarde.",
      },
      { status: 502 },
    );
  }

  console.info("Nuevo lead Gatodato enviado", {
    ...payload,
    recibidoEn: new Date().toISOString(),
    mensajeId: data?.id,
  });

  return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
}
