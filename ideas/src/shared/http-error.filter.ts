import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Http2ServerResponse} from "http2";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();

        const res = ctx.getResponse();
        const req = ctx.getRequest();

        res.status(500).json({
            test: exception
        })
    }
}
