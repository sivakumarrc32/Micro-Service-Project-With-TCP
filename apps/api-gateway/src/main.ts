import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TimingInterceptor } from '@app/contracts/shared/interceptors/timing.interceptors';
import morgan from 'morgan';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ApiGatewayModule);

  app.useStaticAssets(join(__dirname, '..', '..', '..', 'uploads'), {
    prefix: '/uploads',
  });
  morgan.token('req-time', (req) => Date.now());
  morgan.token('res-time', () => Date.now());

  app.use(
    morgan(
      ':method :url req=:req-time - res=:res-time - :status - :res[content-length] - :response-time ms',
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  // app.useGlobalInterceptors(new TimingInterceptor());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
