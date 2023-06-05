import { transporter } from "@/src/lib/nodemailer";

export async function POST(req: Request) {
    sendEmail();
}

function sendEmail() {
    transporter.sendMail({
      to: 'csahy2@illinois.edu',
      from: 'no-reply@illinimarketplace.com',
      subject: 'Test',
      text: 'email successfully sent',
    },
    (err) => {
      console.log(err);
    })
  }