import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
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
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    delete user.password;

    return {
      user,
      token,
    };
  }
}
