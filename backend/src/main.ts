import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API REST para la gestión de productos, categorías e inventario')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, documentFactory(), {
    customSiteTitle: 'Mi Almacen - API Docs',
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
