import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto} from "./user.dto";

@Injectable()
export class UserService {
    constructor(
            @InjectRepository(UserEntity)
            private userRepository: Repository<UserEntity>
    ) {

    }


    public async showAll() {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    public async login(data: UserDto) {
        const { username, password} = data;
        const user = await this.userRepository.findOne({where: {username}});

        if(!user || !user.comparePassword(password)) {
            throw new HttpException(
                'Invalid username/pass',
                    HttpStatus.UNAUTHORIZED
            )
        }

        return user.toResponseObject();
    }

    public async register(data: UserDto) {
        const { username } = data;
        let user = await this.userRepository.findOne({where: { username}})
        if(user) {
            throw new HttpException(
                'User already exist',
                HttpStatus.BAD_REQUEST
            )
        }

        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        
        return user.toResponseObject();
    }
}
