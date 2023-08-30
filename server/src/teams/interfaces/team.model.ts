import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Team {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  score: number;
}

