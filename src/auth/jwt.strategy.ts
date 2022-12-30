import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as admin from 'firebase-admin';
import { UnauthorizedException } from '@nestjs/common';

@Strategy('jwt')
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    try {
      // Verify the ID token using the Firebase Admin SDK.
      const decodedIdToken = await admin.auth().verifyIdToken(payload.sub);
      return { userId: decodedIdToken.uid };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
