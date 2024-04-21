import config from "config";
import {MailtrapConfig} from "../../../config/types";
import {MailtrapClient, SendResponse} from "mailtrap";

/**
 * Represents a singleton EmailService.
 * @constructor
 */
class EmailService {
    private static instance: EmailService;
    private client: MailtrapClient;
    private readonly mailConfig: MailtrapConfig = config.get<MailtrapConfig>("Mailtrap");

    private constructor() {
        this.client = new MailtrapClient({token: this.mailConfig.api.token });
    }

    static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }

        return EmailService.instance;
    }

    /**
     * Sends an email with the given subject, text, category, recipient email, and recipient name.
     *
     * @param {string} subject - The subject of the email.
     * @param {string} text - The text content of the email.
     * @param {string} category - The category of the email.
     * @param {string} recipientEmail - The email address of the recipient.
     * @param {string} recipientName - The name of the recipient.
     * @return {Promise<SendResponse>} - A promise that resolves with the response from the email sending operation.
     */
    sendEmail(
        subject: string,
        text: string,
        category: string,
        recipientEmail: string,
        recipientName: string
    ): Promise<SendResponse> {
        const sender = {
            email: this.mailConfig.mail.sender,
            name: recipientName,
        };

        const recipients = [
            {
                email: recipientEmail,
            }
        ];

        return this.client
            .send({
                from: sender,
                to: recipients,
                subject: subject,
                text: text,
                category: category,
            });
    }
}
