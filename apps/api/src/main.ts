import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import pinoHttp from 'pino-http';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const runtimeConfig = app.get(ConfigService);

  app.use(requestIdMiddleware);
  app.use(
    pinoHttp({
      level: runtimeConfig.get('LOG_LEVEL', 'info'),
      genReqId: (request) => request.id,
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'res.headers.set-cookie',
          '*.access_token',
          '*.refresh_token',
          '*.otp',
          '*.token',
        ],
        censor: '[REDACTED]',
      },
      customProps: () => ({
        environment: runtimeConfig.get('NODE_ENV', 'development'),
      }),
    }),
  );

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: runtimeConfig.getOrThrow<string>('CORS_ORIGIN'),
  });

  const config = new DocumentBuilder()
    .setTitle('Revvy API')
    .setDescription('Revvy V1 API - Auto-service business management platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = runtimeConfig.getOrThrow<number>('PORT');
  await app.listen(port);
}

bootstrap();
