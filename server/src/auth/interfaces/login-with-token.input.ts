import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginWithTokenInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
