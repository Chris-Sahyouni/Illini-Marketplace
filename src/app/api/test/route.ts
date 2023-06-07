import { transporter } from "@/src/lib/nodemailer";

export async function POST(req: Request) {
    sendEmail();
}

function sendEmail() {
    transporter.sendMail({
      to: 'pxs456@gmail.com',
      from: 'no-reply@illinimarketplace.com',
      subject: 'You\'re gay',
      text: '',
    },
    (err) => {
      console.log(err);
    })
  }