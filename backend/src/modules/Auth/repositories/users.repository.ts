import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * Repository cho user
 */
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  /**
   * Tìm user bằng email
   * @param email 
   * @returns 
   */
  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
}


