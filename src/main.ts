import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { blancLogger, BlancLoggerMiddleware } from 'blanc-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: blancLogger,
  });

  const config = new DocumentBuilder()
    .setTitle('luckstargram-backend')
    .setDescription('luckstargram-backend')
    .setVersion('1.0.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(new BlancLoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
