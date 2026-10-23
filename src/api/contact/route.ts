import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inisialisasi Resend dengan Environment Variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Anti-Spam (Honeypot Check)
    if (honeypot) {
      // Jika field honeypot terisi (biasanya diisi oleh bot), pura-pura sukses tanpa mengirim email
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. Validasi Keberadaan Field
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    // 3. Validasi Format Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // 4. Validasi Batas Panjang Teks
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Nama terlalu panjang (maksimal 100 karakter)." },
        { status: 400 }
      );
    }
    if (subject.trim().length > 150) {
      return NextResponse.json(
        { error: "Subjek terlalu panjang (maksimal 150 karakter)." },
        { status: 400 }
      );
    }
    if (message.trim().length > 3000) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang (maksimal 3000 karakter)." },
        { status: 400 }
      );
    }

    // 5. Pengiriman Email via Resend
    const data = await resend.emails.send({
      from: "Portofolio <onboarding@resend.dev>",
      to: ["zebuaf2@gmail.com"],
      replyTo: email,
      subject: `[Portofolio] ${subject.trim()}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 8px;">Pesan Baru dari Website Portofolio</h2>
          <p><strong>Nama Pengirim:</strong> ${name.trim()}</p>
          <p><strong>Email Pengirim:</strong> ${email.trim()}</p>
          <p><strong>Subjek:</strong> ${subject.trim()}</p>
          <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0; whitespace: pre-wrap;">${message.trim()}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 25px;" />
          <p style="font-size: 12px; color: #64748b;">Pesan ini dikirim otomatis melalui Form Kontak di portofolio Anda.</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}