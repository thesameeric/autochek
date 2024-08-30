import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(data: CreateUserDto) {
    const { email, password, firstName, otherNames } = data;

    const alreadyExistingUser = await this.userRepository.findOne(
      'email',
      email,
    );
    if (alreadyExistingUser)
      throw new HttpException(
        'User with email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: any = await this.userRepository.save({
      email,
      firstName,
      otherNames,
      password: hashedPassword,
    });
    delete user.password;
    console.log(process.env.SECRET);
    const token = await jwt.sign(user, process.env.SECRET, { expiresIn: '3d' });
    return { user, token };
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOne('email', email);

    if (!user) {
      throw new HttpException(
        'Incorrect login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException(
        'Incorrect login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: '3d' },
    );
    delete user.password;

    return {
      user,
      token,
    };
  }
}
