import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IMailNotification, IMailer } from "../interface";
import config from "@/config";

export class MailtrapMailer implements IMailer {
  private transporter;

  constructor() {
    const options: SMTPTransport.Options = {
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    };
    this.transporter = nodemailer.createTransport(options);
  }

  async send(mailNotification: IMailNotification): Promise<void> {
    await this.transporter.sendMail({
      from: '"Task Manager" <notification@taskmanager.com>',
      to: mailNotification.to,
      subject: mailNotification.subject,
      text: mailNotification.text,
      html: mailNotification.html,
    });
  }
}
