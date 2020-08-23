import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {IdeaService} from "./idea.service";
import {IdeaDto} from "./idea.dto";
import { Logger } from '@nestjs/common';

@Controller('idea')
export class IdeaController {
    constructor(
        private ideaService: IdeaService,
    ) {
    }

    @Get()
    public showAllIdeas() {
        return this.ideaService.showAll();
    }

    @Get(':id')
    public readIdea(@Param() id: string) {
        console.log('READ IDEA');
        return this.ideaService.read(id);
    }

    @Put(':id')
    public updateIdea(@Param() id: string, @Body() data: Partial<IdeaDto>) {
        return this.ideaService.update(id, data);
    }

    @Post()
    public createIdea(@Body() data: IdeaDto) {

        console.log(data);
        try {
            return this.ideaService.create(data);
        } catch (e) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    @Delete()
    public destroyIdea(@Param() id) {
        this.ideaService.destroy(id);
    }
}
