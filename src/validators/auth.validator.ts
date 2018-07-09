import { IDemoCredentials } from "../models/interfaces/credentials";
import { MYSQL } from "../services/mysql.service";

class AuthValidator {
    validateDemoCredentials(creds: IDemoCredentials): boolean {
        return creds.businessName && creds.firstName && creds.lastName && creds.phone && creds.email && this.validateEmail(creds.email);
    }

    validateEmail(email: string): boolean {
        // tslint:disable-next-line:max-line-length
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }

    async isEmailTaken(email: string): Promise<boolean> {
		const users = await MYSQL.tables.users.items();
		const user = users.find(u => u.email === email);
        return !!user;
    }
}

export const AUTH_VALIDATOR = new AuthValidator();
