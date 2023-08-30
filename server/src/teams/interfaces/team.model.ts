import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TeamModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  score: number;
}

