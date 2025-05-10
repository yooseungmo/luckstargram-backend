import { NestFactory } from '@nestjs/core';
import { blancLogger, BlancLoggerMiddleware } from 'blanc-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: blancLogger,
  });

  app.use(new BlancLoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
