import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

// API cho bảo mật
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * API cho đăng nhập
   * @param body 
   * @returns 
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const result = await this.authService.login({
      email: body.email,
      password: body.password,
      remember: body.remember,
    });
    return result;
  }

  /**
   * API cho lấy thông tin tài khoản hiện tại
   * Bảo mật bằng JWT
   * @param user 
   * @returns 
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: { userId: number; email: string }) {
    return user;
  }

  /**
   * API cho đăng xuất
   * @returns 
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: { userId: number; email: string; jti?: string; exp: number }) {
    return this.authService.logout(user);
  }
}
