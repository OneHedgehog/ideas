import {Body, Controller, Get, Inject, Post, UseGuards, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {IdeaDto} from "../idea/idea.dto";
import {UserDto} from "./user.dto";
import {AuthGuard} from "../shared/auth.guard";
import {User} from "./user.decorator.t";

@Controller('api/users')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    @UseGuards(new AuthGuard())
    public getAllUsers(@User() user) {
        console.log(user);
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
