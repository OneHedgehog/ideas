import {Body, Controller, Get, Inject, Post, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {IdeaDto} from "../idea/idea.dto";
import {UserDto} from "./user.dto";

@Controller('api/users')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    public getAllUsers() {
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    public login(@Body() data) {
        return this.userService.login(data);
    }

    @Post('register')
    // @UsePipes(new ValidationPipe())
    public register(@Body() data: UserDto) {
        this.userService.register(data);
    }
}
