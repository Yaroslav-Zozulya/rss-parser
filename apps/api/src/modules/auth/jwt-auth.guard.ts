import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jvtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const { email } = this.jvtService.verify(token);
      const user = await this.userService.getUserByEmail(email);

      if (!user || user.token !== token) {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;

      return true;
    } catch (error) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
