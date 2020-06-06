import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {TYPEORM_CONFIG} from "./typeorm.config"
import {ConfigModule, ConfigService} from '@nestjs/config';
import {doc} from "prettier";
import join = doc.builders.join;

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: 'postgres',
            password: process.env.POSTGRES_PASSWORD,
            database: 'ideas',
            entities: ['dist/**/*.entity.js'],
            logging: true,
            synchronize: true
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        private configService: ConfigService
    ) {
        console.log(process.env);
        console.log('[dsfsdf]', this.configService.get('POSTGRES_HOST'));
    }
}
