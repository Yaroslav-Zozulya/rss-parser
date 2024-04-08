import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/createUserDto.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerRootUser(userDto: CreateUserDto) {
    const users = await this.userService.getAllUsers();
    if (users.length) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcryptjs.hash(userDto.password, 10);
    const rootUser = await this.userService.createRootUser({
      ...userDto,
      password: hashPassword,
      role: 'admin',
    });
    return rootUser;
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 10);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return newUser;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const { token } = await this.generateToken(user);
    await this.userService.addToken(user.email, token);
    return { token };
  }

  private async generateToken(newUser: User) {
    const payload = { email: newUser.email, roles: newUser.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async verifyToken() {
    return true;
  }
}
