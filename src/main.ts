import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey:
//       '-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuy0JaQgqdCSV/\\nafxFygd+JAhVYeEgyIDknEKLIecN36pk35RcZ3RbPbaVOlmKSa6sb9grLDnU5qpl\\nLOH14I07idw3KlErB7OrFSMdmcEtoVl7MBWNusHioOkndRhRtGemMdfxuFZVc7Az\\n6JBmKwg3CQH/C4lQ59IHdnQEC6sX0eyDi+AksT6CQaLoucqvYXzUVTVgCsh1eMDZ\\nga4Ho13BrOrOj4o7dsEzY1qsrw5Msnqnz2SRj4GWwrOZcZITHr53Gf1WKXvcwWCu\\nG5zP/UxpINgBmb21UWYkdVYUEWe0tmXbgpptIeRLzZ7wEsCOPYKG605tciH8SPqU\\nLxlegL/LAgMBAAECggEAAqZ0TW1ePylKAezidVBt3VIV35g0qKGW9WBlJeTlXZwm\\n4jv9l4por5AiT5BAlqHYCHydo3Hv4ol+IJCV+yYPc3f7Tcl8zOaN/n8QjDyuOs83\\nzcVZ3k9Bl0+8mUDjldbivMNZXyyIqpJZeUACcyTIjW+73FkZbjpFlfVhfETiWuG+\\nhQKkE9QO6lCXjAbtSD4AOWJK6imrqQ7SvJnKw0u7lJPDYmwLdiuu3tfYA/maZHlT\\n3bpf65xG9laLDYeXg+pNc7BxdQrLLmlhYC/32sh4OH0i+1GFPphG5n3VupLIEo21\\nM4ca3z+2jpQ6nYRmRmkqkqyhqbItAgVY9r3LJsIcqQKBgQDcoY50xKaXybE6ODN3\\ndgpdem9Bp2ym1XHif2wYb6uBl5wwvywSzqgDJQDONCo/PiiRzKULfrYATSSkwawz\\ndL3rAVIDFD83JmnvJNjIClnC80FpkygSKkWzDUBwRwqUILU/xEqYcAglwcTbK6hh\\nTruQavruIYapOzpPPCD1aUXGtQKBgQDK0JnzdJ3/KgyJgcVzeGMcawbEHR1ya25n\\nTX7yqXICYr3desvWWYin76DultiHwkQW9TXGOjdknimB/EZCffasTVwp908d18Zd\\no11xN/GZL8pxJeuOfKfeWLaZ87YxcQXvaX8C15fcsVXVGA5dfleGzbzvSJy2cv09\\ne+203MX8fwKBgCP3wn2OwYnlO5s+JkXHXJE4sIKHhNL94P8HvtuM+Oy7hp77y3eV\\ncRZyJdt37Zs5yutZ7V4eXhVWfi7N1ADfe0aghHo0Bso63PI7k4upBFEfzv4jG1k6\\nwvoZovOq4TKc0m9+1JpdSTa+jBUe3OhgKXu1tQq1NHrKSQs5xjW738AxAoGAWpfX\\nTLI4qPPFad63rh6GVvlPqmY+8w8d37L0E7ywmnQ0zyu8xWB09F7LigeDbRDPjVm2\\nzXbPq3ginldrouPVPZ3In05C3te1WbpRUPNmTcDVMrl3gMwZx+3kktwT8/3CYvDC\\ntShMQ15LMsZuFEENI7/etxu+NJkkmUQ0J+e94E0CgYBdFNdvv3reUazB+D1EYPha\\npGq0eDG7vrN8586i9NoVy6/8Pmdlm9m3aMr8XLqGfcMMo9KF+yQyjOxc3I9rdOKw\\nCeNUrPPUA973kGpwj838+p2HaYwSJaOqzdRSLxnlcVXFbl5tIfgReBJy1jHsZKCh\\nCsZTQlFS/7vW9PWOY4q5ew==\\n-----END PRIVATE KEY-----\\n'.replace(
//         /\\n/g,
//         '\n',
//       ),
//     projectId: 'laundry-guru-50b7a',
//     clientEmail:
//       'firebase-adminsdk-mski8@laundry-guru-50b7a.iam.gserviceaccount.com',
//   }),
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
// export const api = functions.https.onRequest(bootstrap);
