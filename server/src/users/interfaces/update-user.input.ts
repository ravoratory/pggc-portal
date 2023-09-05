import { Field, InputType } from "@nestjs/graphql";
import { Role } from "@prisma/client";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  Id: number;

  @Field({ nullable: true })
  pgritId: string;

  @Field({ nullable: true })
  githubId: string;

  @Field({ nullable: false })
  userId: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => Role, { nullable: true })
  role: Role;
}