import { AuthAccess } from './auth-access.interface';
import { Token } from './token.interface';

export interface LoginResponse {
    token: Token;
    access: AuthAccess;
}
