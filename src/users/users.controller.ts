import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentuser.decorator';

@Controller('auth')
@Serialize(UserDto)
// decorator applied to all routes
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signup(body.email, body.password)
        // set user id in a cookie
        session.userId = user.id
        return user;
    }

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.userService.findOne(session.userId)
    // }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: string){
        return user
    }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto,  @Session() session: any){
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id))
        if(!user){
            throw new NotFoundException('User not found')
        }

        return user;
    }

    @Get()
    findAllUser(@Query('email') email: string){
        return this.userService.find(email)
    }
 
    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body)
    }

}
