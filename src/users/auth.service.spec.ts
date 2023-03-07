import {Test} from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserEntity } from './user.entity'
import { UsersService } from './users.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'

let service: AuthService;
let fakeUsersService: Partial<UsersService>;

describe('Auth service', ()=> {
    beforeEach(async ()=> {
        //Create a fake copy of usersService
        // use typescript to ensure what we use inside useValue is what it should be
        fakeUsersService = {
            find: ()=> Promise.resolve([]),
            create: (email: string, password: string)=> Promise.resolve({id: 1, email, password} as UserEntity)
        }
        // temporary testing DI Container
        // the list of providers is the list of classes we want to register inside out container.
        // the object provided to providers, it creates a copy of userservive with the value we provided afterwards, something like: if anyone asks for this, give the value provided
        const module = await Test.createTestingModule({
            providers: [
                AuthService, 
                {
                    provide: UsersService, 
                    useValue: fakeUsersService
                }
            ]
        }).compile()

        // reach into the test DI container
        // creates an instance of authService with all its dependencies
        service = module.get(AuthService)
    })

    it('can create an instance of auth service', async ()=> {
        expect(service).toBeDefined();
    })

    it('creates new user with salted and hash password', async ()=> {
        const user = await service.signup('asd@test.com', 'asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async()=>{
        fakeUsersService.find = ()=> Promise.resolve([{id: 1, email: 'a', password: '1'} as UserEntity]);
        await expect(service.signup('asdf@test.com', 'asdf')).rejects.toThrow(BadRequestException)
    })

    it('throws an error if signin is called with an unsused email', async()=>{
        await expect(service.signin('asdf@test.com', 'asdf')).rejects.toThrow(NotFoundException)
    })

})