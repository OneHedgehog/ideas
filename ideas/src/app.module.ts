import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from '@nestjs/config';
import { IdeaModule } from './idea/idea.module';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {HttpErrorFilter} from "./shared/http-error.filter";
import {LoggingInterceptor} from "./shared/logging.interceptor";
import {UserModule} from "./user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database:  process.env.POSTGRES_DB,
            entities: ['dist/**/*.entity.js'],
            logging: true,
            synchronize: true,
            retryAttempts: 2,
            retryDelay: 1000
        }),
        IdeaModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ],
})
export class AppModule {
    constructor(
        private configService: ConfigService
    ) {
        console.log(process.env);
    }
}
