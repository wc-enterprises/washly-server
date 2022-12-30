import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AppModule } from './src/app.module';

admin.initializeApp({
  credential: admin.credential.cert(functions.config().washly_config),
  databaseURL: 'https://laundry-guru-50b7a.firebaseio.com',
});
const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
