import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, "token") {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "username" });
  }

  async validate(username: string, password: string) {
    console.log(username, password);
    const user = this.authService.validateUser(username, "", password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
