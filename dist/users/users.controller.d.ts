import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(body: CreateUserDto): Promise<import("./user.entity").UserEntity>;
    findUser(id: string): Promise<import("./user.entity").UserEntity>;
    findAllUser(email: string): Promise<import("./user.entity").UserEntity[]>;
    removeUser(id: string): Promise<void>;
    updateUser(id: string, body: UpdateUserDto): Promise<void>;
}
