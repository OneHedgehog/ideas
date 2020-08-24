import {Controller, Get} from "@nestjs/common";

@Controller('users')
export class UserController {
    @Get()
    public heartbeat() {
        return 'df';
    }
}
