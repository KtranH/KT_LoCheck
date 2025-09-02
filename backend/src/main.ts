import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from env.local
dotenv.config({ path: resolve(__dirname, '../.env') });

async function bootstrap() {
  // Tạo app
  const app = await NestFactory.create(AppModule);
  // Bật CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // Cấu hình cổng
  const port = process.env.PORT || 3001;
  // Chạy app
  await app.listen(port);
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
}
bootstrap();
