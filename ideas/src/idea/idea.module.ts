import { Module } from '@nestjs/common';
import {IdeaController} from "./idea.controller";
import {IdeaService} from "./idea.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {IdeaEntity} from "./idea.entity";
import {UserEntity} from "../user/user.entity";

@Module({
    controllers: [IdeaController],
    providers: [IdeaService],
    imports: [
        TypeOrmModule.forFeature([IdeaEntity, UserEntity])
    ]
})
export class IdeaModule {}
