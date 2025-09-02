import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../../config/app.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenBlacklistService } from './services/token-blacklist.service';

@Module({
  imports: [
    // ConfigModule dùng để đọc các biến môi trường
    ConfigModule.forFeature(appConfig),
    // TypeOrmModule dùng để kết nối với database
    TypeOrmModule.forFeature([User]),
    // JwtModule dùng để tạo token bảo mật
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: config.jwtExpiresIn },
      }),
    }),
  ],
  // Controllers
  controllers: [AuthController],
  // Providers
  providers: [AuthService, UsersRepository, JwtStrategy, TokenBlacklistService],
})
export class AuthModule {}


