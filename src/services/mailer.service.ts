import * as nodemailer from 'nodemailer';
import { API_CONFIG } from './convict.service';
import * as fs from 'file-system';
import * as path from 'path';
import { APILogger } from './logger.service';

export class Mailer {
    private transporter;
    private mailOptions;
    private logger = APILogger.getLogger('mailer');

    constructor() {
        this.initTransporter();
        this.initMailOptions();
    }

    initTransporter(): void {
        const config = API_CONFIG.mailer;
        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: true,
            auth: {
                user: config.user,
                pass: config.password,
            },
        });
    }

    initMailOptions(): void {
        const config = API_CONFIG.mailer;
        this.mailOptions = {
            list: {
                help: `${config.user}?subject=help`,
                unsubscribe: {
                    url: `mailto:${config.user}?subject=unsubscribe`,
                    comment: 'Unsubscribe',
                },
            },
            from: `AIS Novations <${config.user}>`,
        }
	}
	
	async sendRestorePasswordEmail(email: string, password: string): Promise<any> {
        //let html = fs.readFileSync(path.join(__dirname, 'static/emails/restore-password-email.html'), 'utf8');
        // html = html.replace('{{email}}', `${email}`);
        // html = html.replace(/{{baseUrl}}/g, `${API_CONFIG.baseUrl}`);
        // html = html.replace('{{password}}', `${atob(password)}`);
		const subj = 'Restore Phoenix credentials';
		//return this.send(email, subj, html);
        return this.send(email, subj, `${email} / ${password}`);
    }

    send(recipient: string, subject: string, html: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const mail = Object.assign({}, this.mailOptions);
            mail.to = recipient;
            mail.subject = subject;
            mail.html = html;
            try {
                const res = await this.transporter.sendMail(mail);
                if (res.error) {
                    this.logger.error(res.error);
                    reject(res.error);
                } else {
                    this.logger.info(`Email request to user ${recipient} has been successfully sent.`);
                    resolve();
                }
            } catch (e) {
                this.logger.error(e);
                reject(e);
            }
        });
    }
}

export const MAILER = new Mailer();