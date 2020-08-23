import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {IdeaEntity} from "./idea.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IdeaDto} from "./idea.dto";

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>
    ) {
    }

    public async showAll() {
        console.log('[showAll from service]');
        return await this.ideaRepository.find()
    }

    public async create(data: IdeaDto) {
        const idea = this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        // error here
        return idea;
    }

    public async read(id: string) {
        return await this.ideaRepository.findOne({
            where: {id}
        })
    }


    public async update(id: string, data: Partial<IdeaDto>) {
        await this.ideaRepository.update({id}, data);
        return await this.ideaRepository.findOne({
            where: {id}
        })
    }

    public async destroy(id: string) {
        await this.ideaRepository.delete({id});
        return {deleted: true};
    }
}
