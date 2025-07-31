import { IMailer, IMailNotification } from "../interface";

export class ConsoleLogMailer implements IMailer {
  async send(mailNotification: IMailNotification): Promise<void> {
    console.log(mailNotification.text);
  }
}
