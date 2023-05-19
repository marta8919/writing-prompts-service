import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  // to wire dependency we need constructor
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // first check if email is already in DB
    const users = await this.usersService.find(email);
    // this could be replaced by a custom validator!!!
    if (users.length) {
      throw new BadRequestException('Email already in use');
    }

    // hash password----------------
    // generate salt
    const salt = randomBytes(8).toString('hex');
    // hash the password and salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join hash and salt together
    const hashed_password = salt + '.' + hash.toString('hex');

    // store new user on DB
    const user = await this.usersService.create(email, hashed_password);
    // return user
    return user;
  }

  async signin(email: string, password: string) {
    // find email, return user without password
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // decouple salt from password
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password');
    }
    return user;
  }
}
