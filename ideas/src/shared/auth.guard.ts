import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const req = context.switchToHttp().getRequest();

        if(!req.headers.authorization) {
            return false;
        }

        return this.validateToken(req.headers.authorization);
        return true;
    }

    async validateToken(token) {
        const [tokenType, tokenValue] = token.split(' ');
        if (tokenType !== 'Bearer') {
            throw new HttpException(
                'Invalid token',
                HttpStatus.UNAUTHORIZED
            );
        }

        try {
            const decoded = jwt.verify(tokenValue, process.env.SECRET);
            return decoded;
        } catch (err) {
            const message = `Token error: ${err.message || err.name}`;
            throw new HttpException(message, HttpStatus.UNAUTHORIZED)
        }
    }
}
