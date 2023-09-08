import { Field, InputType } from "@nestjs/graphql";
import { Role } from "@prisma/client";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  pgritId: string;

  @Field({ nullable: true })
  githubId: string;

  @Field({ nullable: true })
  userId: string;

  @Field(() => Role, { nullable: true })
  role: Role;
}
