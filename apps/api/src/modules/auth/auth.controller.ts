import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/createUserDto.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { ValidationBodyPipe } from 'src/pipes/validationBody.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UsePipes(ValidationBodyPipe)
  @Post('/registration/admin')
  createRootUser(@Body() userDto: CreateUserDto) {
    return this.authService.registerRootUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/registration')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
}
