import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Team")
@InputType("TeamInput")
export class Team {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  score: number;
}
