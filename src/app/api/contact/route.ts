import { NextResponse } from "next/server";

const requiredFields = ["nombre", "email", "empresa", "modelo"] as const;

type ContactPayload = Record<string, string>;

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

  // Placeholder para integrar con CRM o email provider
  console.info("Nuevo lead Datogato", {
    ...payload,
    recibidoEn: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
