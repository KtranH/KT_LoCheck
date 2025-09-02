import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard cho JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


