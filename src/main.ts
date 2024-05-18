import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './server_exceptions/serverExceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(2717);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
