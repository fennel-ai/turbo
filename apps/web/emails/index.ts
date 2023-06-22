import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
	pool: true,
	host: "smtp.sendgrid.net",
	port: 465,
	secure: true, // use TLS
	auth: {
		user: "apikey",
		pass: process.env.SENDGRID_KEY,
	},
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "Fennel <hello@fennel.ai>",
  configPath: "./mailing.config.json",
});

export default sendMail;
