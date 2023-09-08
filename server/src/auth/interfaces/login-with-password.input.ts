import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginWithPasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
