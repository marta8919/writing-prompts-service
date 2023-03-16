import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<UserEntity>;
    whoAmI(user: UserEntity): UserEntity;
    signout(session: any): void;
    signin(body: CreateUserDto, session: any): Promise<UserEntity>;
    findUser(id: string): Promise<UserEntity>;
    findAllUser(email: string): Promise<UserEntity[]>;
    removeUser(id: string): Promise<void>;
    updateUser(id: string, body: UpdateUserDto): Promise<void>;
}
