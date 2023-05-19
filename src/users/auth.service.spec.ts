import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

let service: AuthService;
let mockUsersService: Partial<UsersService>;

describe('Auth service', () => {
  beforeEach(async () => {
    const users: UserEntity[] = [];
    //Create a fake copy of usersService
    // use typescript to ensure what we use inside useValue is what it should be
    mockUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as UserEntity;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    // temporary testing DI Container
    // the list of providers is the list of classes we want to register inside out container.
    // the object provided to providers, it creates a copy of userservive with the value we provided afterwards, something like: if anyone asks for this, give the value provided
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    // reach into the test DI container
    // creates an instance of authService with all its dependencies
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  describe('Signup', () => {
    it('throws an error if user signs up with email that is in use', async () => {
      // create a user
      await service.signup('asdf@test.com', 'asdf');
      // try to create another user with same email
      await expect(service.signup('asdf@test.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('Signin / Log in', () => {
    it('creates new user with salted and hash password', async () => {
      const user = await service.signup('asd@test.com', 'asdf');
      expect(user.password).not.toEqual('asdf');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('throws an error if signin is called with an unsused email', async () => {
      await expect(service.signin('asdf@test.com', 'asdf')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Password', () => {
    it('throws if an invalid password is provided', async () => {
      // first create user with a different password than on the assertion
      await service.signup('asdf@asdf.com', 'passwrd');
      // then test password
      await expect(service.signin('asdf@asdf.com', 'password')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('returns a user if correct password is provided', async () => {
      await service.signup('test@test.com', '123');

      const user = await service.signin('test@test.com', '123');
      expect(user).toBeDefined();
    });
  });
});
