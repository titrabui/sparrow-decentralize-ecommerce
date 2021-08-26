import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);

  await app.listen(config.get('SERVER_PORT'), () => {
    logger.log(`=========== 🎉 Server️ is running on PORT ${config.get('SERVER_PORT')} 🎉 ===========‍`);
  });
}
bootstrap();
