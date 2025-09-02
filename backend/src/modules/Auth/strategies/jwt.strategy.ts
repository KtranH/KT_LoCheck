import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from '../../../config/app.config';
import { Inject } from '@nestjs/common';
import { TokenBlacklistService } from '../services/token-blacklist.service';

/**
 * Strategy cho JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(appConfig.KEY) config: ConfigType<typeof appConfig>,
    private readonly blacklist: TokenBlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  /**
   * Kiểm tra payload
   * @param payload 
   * @returns 
   */
  async validate(payload: { sub: number; email: string; jti?: string; exp: number }) {
    if (payload.jti && this.blacklist.isRevoked(payload.jti)) {
      throw new UnauthorizedException('Token đã bị thu hồi');
    }
    return { userId: payload.sub, email: payload.email, jti: payload.jti, exp: payload.exp };
  }
}


