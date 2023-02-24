import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<import("./user.entity").UserEntity>;
    whoAmI(user: string): string;
    signout(session: any): void;
    signin(body: CreateUserDto, session: any): Promise<import("./user.entity").UserEntity>;
    findUser(id: string): Promise<import("./user.entity").UserEntity>;
    findAllUser(email: string): Promise<import("./user.entity").UserEntity[]>;
    removeUser(id: string): Promise<void>;
    updateUser(id: string, body: UpdateUserDto): Promise<void>;
}
