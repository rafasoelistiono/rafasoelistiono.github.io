import nodemailer from "nodemailer";

export function validateContactPayload(payload) {
  const errors = {};
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const subject = String(payload.subject || "").trim();
  const message = String(payload.message || "").trim();
  const website = String(payload.website || "").trim();

  if (website) errors.website = "Spam check failed.";
  if (name.length < 2 || name.length > 80) errors.name = "Name must be 2 to 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Use a valid email address.";
  if (subject.length < 3 || subject.length > 120) errors.subject = "Subject must be 3 to 120 characters.";
  if (message.length < 20 || message.length > 3000) errors.message = "Message must be 20 to 3000 characters.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { name, email, subject, message }
  };
}

export async function sendContactEmail({ name, email, subject, message }) {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "SMTP_TO"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing SMTP environment variables: ${missing.join(", ")}`);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta"
  }).format(new Date());

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: [
      "New portfolio contact message",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Submitted: ${submittedAt} WIB`,
      "",
      "Message:",
      message,
      "",
      `Reply directly to this email or contact ${email}.`
    ].join("\n"),
    html: buildContactEmailTemplate({ name, email, subject, message, submittedAt })
  });
}

function buildContactEmailTemplate({ name, email, subject, message, submittedAt }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Portfolio Contact</title>
  </head>
  <body style="margin:0;background:#f3f3f0;color:#181818;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f3f0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #d8d8d2;">
            <tr>
              <td style="padding:28px 28px 20px;border-bottom:1px solid #d8d8d2;background:#111111;color:#f2f2f2;">
                <p style="margin:0 0 12px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#bdbdbd;">Rafa Soelistiono Portfolio</p>
                <h1 style="margin:0;font-size:34px;line-height:1;font-weight:800;letter-spacing:-.02em;">New contact message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 28px 8px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#707070;">Subject</p>
                <h2 style="margin:0;font-size:24px;line-height:1.16;color:#181818;">${safeSubject}</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #d8d8d2;border-bottom:1px solid #d8d8d2;">
                  <tr>
                    <td style="padding:14px 0;width:34%;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#707070;">Name</td>
                    <td style="padding:14px 0;font-size:15px;color:#181818;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-top:1px solid #e8e8e4;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#707070;">Email</td>
                    <td style="padding:14px 0;border-top:1px solid #e8e8e4;font-size:15px;">
                      <a href="${mailto}" style="color:#181818;text-decoration:underline;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-top:1px solid #e8e8e4;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#707070;">Submitted</td>
                    <td style="padding:14px 0;border-top:1px solid #e8e8e4;font-size:15px;color:#181818;">${escapeHtml(submittedAt)} WIB</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 28px 28px;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#707070;">Message</p>
                <div style="font-size:16px;line-height:1.55;color:#252525;background:#f7f7f3;border-left:4px solid #181818;padding:18px 20px;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 32px;">
                <a href="${mailto}" style="display:inline-block;background:#181818;color:#ffffff;text-decoration:none;padding:13px 18px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;">Reply to ${safeName}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;border-top:1px solid #d8d8d2;color:#707070;font-size:12px;line-height:1.5;">
                This email was sent from the contact form on Rafa Soelistiono Portfolio.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
