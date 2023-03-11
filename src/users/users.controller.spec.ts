import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: '123',
        } as UserEntity),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: '123' } as UserEntity]),
      // remove: (id: number)=> Promise.resolve(),
      // update: ()=> null,
    };
    mockAuthService = {
      // signup: ()=> null,
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as UserEntity),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with given email', async () => {
    const users = await controller.findAllUser('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    mockUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    //need to give something to session else on the assertion typescript complains about the type of the object, either that or casting
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: '123' },
      session,
    );

    // id is the one we hardcoded on out mockService
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('signout should empty session object', () => {
    const session = { userId: 1 };
    controller.signout(session);
    expect(session.userId).toBeNull();
  });

  it('check if whoAmI returns user', () => {
    const user = controller.whoAmI({
      id: 1,
      email: 'test@test.com',
    } as UserEntity);
    expect(user).toEqual({ id: 1, email: 'test@test.com' });
  });

  //ToDo: would be nice to add test for remove and update
});
