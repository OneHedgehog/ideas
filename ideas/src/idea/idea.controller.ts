import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from "@nestjs/common";
import {IdeaService} from "./idea.service";
import {IdeaDto} from "./idea.dto";
import { Logger } from '@nestjs/common';
import {ValidationPipe} from "../shared/validation.pipe";

@Controller('api/idea')
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
        const idea = this.ideaService.read(id);
        if(!idea) {

        }

        return idea;
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    public updateIdea(@Param() id: string, @Body() data: Partial<IdeaDto>) {
        return this.ideaService.update(id, data);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public createIdea(@Body() data: IdeaDto) {
        return this.ideaService.create(data);
    }

    @Delete(':id')
    public destroyIdea(@Param() id) {
        return this.ideaService.destroy(id);
    }
}
