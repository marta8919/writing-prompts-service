import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity as User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){
        this.repo= repo;
    }

    create(email: string, password: string){
        const user = this.repo.create({email, password})
        // user will be an instance of the UserEntity 
        return this.repo.save(user);
    }

    findOne(id: number){
        if(!id) throw new NotFoundException('No user logged in')

        return this.repo.findOne({id: id})       
    }

    find(email: string){
        return this.repo.find({where: {email}})
    }

    async update(id: number, attrs: Partial<User>){
        // first need to find user using the method we defined before
        const user = await this.findOne(id)
        if(!user) throw new NotFoundException('User not found')
        
        // update user instance
        Object.assign(user, attrs);
        // save
        this.repo.save(user)
    }

    async remove(id: number){
        const user = await this.findOne(id)
        if(!user) throw new NotFoundException('User not found')
        
        // remove works with entity, delete with id but won't run hooks
        this.repo.remove(user)
    }
}
