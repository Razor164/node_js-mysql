import { RestController } from '../../services/router.service';
import { APIAuthService } from '../../services/auth.service';
import { API_CONFIG } from '../../services/convict.service';
import { IAdminCredentials, IDemoCredentials } from '../../models/interfaces/credentials';
import { API_ERROR } from '../../models/constants/errors';
import { AUTH_VALIDATOR } from '../../validators/auth.validator';
import { MAILER } from '../../services/mailer.service';
import { MYSQL } from '../../services/mysql.service';

const controller = new RestController('access-manager');

// Login
controller.get<{ token: string }>('/login', async function (req, res) {
    const creds: IAdminCredentials = req.query;
    if (!creds) return Promise.reject(API_ERROR.BAD_REQUEST);

    this.logger.verbose(`Login: ${creds.login} / ${creds.password}`);

    const adminCreds: IAdminCredentials = API_CONFIG.admin;
    if (creds.login === adminCreds.login && creds.password === adminCreds.password) {
        const token = await APIAuthService.getToken();
        if (!token) return Promise.reject(API_ERROR.NOT_AUTHORIZED);
        return { token: token };
    } else {
        return Promise.reject(API_ERROR.NOT_AUTHORIZED);
    }
});

// Request demo
controller.post<void>('/demo', async function (req, res) {
    const creds: IDemoCredentials = req.body;
    if (!AUTH_VALIDATOR.validateDemoCredentials(creds)) return Promise.reject(API_ERROR.BAD_REQUEST);
    const email = creds.email;
    this.logger.info(`User with email ${email} requested demo.`);
});

// Restore password
controller.post<void>('/restore-password', async function (req, res) {
    const email: string = req.body.email;
	if (!AUTH_VALIDATOR.validateEmail(email)) return Promise.reject(API_ERROR.BAD_REQUEST);
	
    const isEmailExists = await AUTH_VALIDATOR.isEmailTaken(email);
    if (!isEmailExists) return Promise.reject(API_ERROR.NOT_FOUND);
    
	const users = await MYSQL.tables.users.items();
	const user = users.find(u => u.email === email);
	
    //await MAILER.sendRestorePasswordEmail(user.email, user.password);
    
    this.logger.info(`User with email ${email} requested restore password.`);
});


export const authController = { controller: controller.instance, url: controller.baseUrl };