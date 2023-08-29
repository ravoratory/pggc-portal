import { Field, InputType } from "@nestjs/graphql";
import { Difficulty } from "@prisma/client";

@InputType()
export class CreateProblemInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field(() => Difficulty, { nullable: false })
  difficulty: Difficulty;
}
