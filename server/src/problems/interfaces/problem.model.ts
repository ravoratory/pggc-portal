import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Difficulty } from "@prisma/client";

@ObjectType()
export class ProblemModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Difficulty)
  difficulty: Difficulty;
}

registerEnumType(Difficulty, {
  name: "difficulty",
});
