import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const port = process.env.PORT || "5000";
  await app.listen(port, "0.0.0.0");
};
bootstrap();
