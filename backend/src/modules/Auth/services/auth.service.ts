import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../dto/login.dto';
import { UsersRepository } from '../repositories/users.repository';
import { TokenBlacklistService } from './token-blacklist.service';
import { v4 as uuidv4 } from 'uuid';

// Service cho bảo mật
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly blacklist: TokenBlacklistService,
  ) {}

  /**
   * Kiểm tra user bằng email và mật khẩu
   * @param email 
   * @param password 
   * @returns 
   */
  async validateUserByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    return user;
  }

  /**
   * Đăng nhập
   * @param payload 
   * @returns 
   */
  async login(payload: LoginDto): Promise<{ accessToken: string; expiresIn: string }> {
    const user = await this.validateUserByEmail(
      payload.email,
      payload.password,
    );
    const remember = Boolean(payload.remember);
    const expiresIn = remember ? '30d' : '24h';
    const jti = uuidv4();
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn, jwtid: jti },
    );
    return { accessToken: token, expiresIn };
  }

  /**
   * Đăng xuất
   * @returns 
   */
  async logout(current: { userId: number; email: string; jti?: string; exp: number }) {
    if (current?.jti) {
      this.blacklist.revoke(current.jti, current.exp);
    }
    return { success: true };
  }
}
