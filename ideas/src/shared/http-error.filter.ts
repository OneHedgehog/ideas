import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {


        const ctx = host.switchToHttp();

        const res = ctx.getResponse();
        const req = ctx.getRequest();

        let httpStatus = 500;
        if('getStatus' in exception ) {
            httpStatus = exception.getStatus();
        }

        const errorResponse = {
            httpStatusCode: httpStatus,
            timestamp: new Date().toLocaleDateString(),
            path: req.url,
            method: req.method,
            message: exception.message
        };

        Logger.error(
            `[${req.method}] [${req.url}] ${exception.message}`,
            exception.stack,
            HttpErrorFilter.name
        );

        res.status(httpStatus).json(errorResponse);
    }
}
