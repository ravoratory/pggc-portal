import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { GqlTokenGuard } from "./guards/token-auth.guard";
import { LoginResponse } from "./interfaces/login-response";
import { LoginWithPasswordInput } from "./interfaces/login-with-password.input";
import { LoginWithTokenInput } from "./interfaces/login-with-token.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args("input") loginWithPasswordInput: LoginWithPasswordInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlTokenGuard)
  async loginWithToken(
    @Args("input") loginWithTokenInput: LoginWithTokenInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
