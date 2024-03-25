import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {ConfigType} from "./configs/config.type";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigType>)
  const PORT = configService.getOrThrow('app.port', {infer: true})

  await app.listen(PORT);

  console.info(`http://localhost:${PORT}`);
}
bootstrap();
