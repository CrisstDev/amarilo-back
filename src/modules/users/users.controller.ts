import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**Login */
    @Post('login')
    login(@Body() payload: { email: string, password: string }) {
        return this.usersService.login(payload.email, payload.password);
    }

    @Post()
    create(@Body() payload: CreateUser) {
        return this.usersService.create(payload);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

}
