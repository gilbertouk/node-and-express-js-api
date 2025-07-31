import { mailer as mailtrapMailer } from "./mailtrap-mailer";
import { mailer as ConsoleLogMailer } from "./console-log-mailer";
import { IMailer } from "./interface";
import config from "@/config";

let mailer: IMailer = mailtrapMailer;

if (config.consoleLogEmails) {
  mailer = ConsoleLogMailer;
}

export { mailer };
