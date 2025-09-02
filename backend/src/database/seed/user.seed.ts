import 'reflect-metadata';
import AppDataSource from '../../config/database.config';
import { DataSource } from 'typeorm';
import { User } from '../../modules/Auth/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function run() {
  const ds: DataSource = await AppDataSource.initialize();
  try {
    const repo = ds.getRepository(User);
    const email = 'admin@example.com';
    const exist = await repo.findOne({ where: { email } });
    if (!exist) {
      const user = repo.create({
        username: 'admin',
        email,
        password: await bcrypt.hash('password', 10),
        is_active: 'active',
      });
      await repo.save(user);
      // eslint-disable-next-line no-console
      console.log('Seeded user:', email, 'password: password');
    } else {
      // eslint-disable-next-line no-console
      console.log('User already exists:', email);
    }
  } finally {
    await ds.destroy();
  }
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

