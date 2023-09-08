import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/interfaces/user.model";

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
