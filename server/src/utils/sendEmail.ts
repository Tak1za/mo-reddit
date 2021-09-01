import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
//   let testAccount = await nodemailer.createTestAccount();
//   console.log(testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ii3jm5zpv4lglt4r@ethereal.email",
      pass: "9ym4tKbUwa3ZWgPUXe",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>',
    to: to,
    subject: "Reset Password",
    html: html
  });

  console.log("message sent: %s", info.messageId);
  console.log("preview url: %s", nodemailer.getTestMessageUrl(info));
}
