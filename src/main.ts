import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: blancLogger,
  });

  app.enableCors({
    origin: [
      'https://luckstargram.com',
      'https://www.luckstargram.com',
      'https://luckstargram-frontend.vercel.app',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
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
  // app.use(new BlancLoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
