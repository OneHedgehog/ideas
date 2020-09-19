import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {IdeaEntity} from "./idea.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {IdeaDto} from "./idea.dto";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
    }

    public async showAll() {
        return await this.ideaRepository.find()
    }

    public async create(userId: string, data: IdeaDto) {
        const user = await this.userRepository.findOne({where: {id: userId}});
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        // error here
        return idea;
    }

    public async read(id: string) {
        const idea = await this.ideaRepository.findOneOrFail(id);

        return idea;
    }


    public async update(id: string, data: Partial<IdeaDto>) {
        await this.ideaRepository.update(id, data);
        return await this.ideaRepository.findOneOrFail({ where: { id } })
    }

    public async destroy(id: string) {
        await this.ideaRepository.delete(id);
        return {deleted: true};
    }
}
