import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/modules/users/dto/createUserDto.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async createRootUser(dto: CreateUserDto) {
    const rootUser = await this.userRepository.create({
      ...dto,
      role: 'admin',
    });
    return rootUser;
  }

  async createUser(dto: CreateUserDto) {
    const createdUser = new this.userRepository(dto);
    return createdUser.save();
  }

  async getAllUsers() {
    const allUsers = this.userRepository.find();
    return allUsers;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async addToken(email: string, token: string) {
    const user = await this.getUserByEmail(email);
    user.token = token;
    user.save();
  }

  async checkAdminUser() {
    const adminUser = await this.userRepository.findOne({ role: 'admin' });
    return adminUser ? true : false;
  }
}
