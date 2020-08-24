import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest();

        const url = req.url;
        const method = req.method;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const requestTimeMs = `${Date.now()  - now}ms`;
                Logger.log(
                    `${method} ${url} ${requestTimeMs }`
                )
            })
        )
    }
}
