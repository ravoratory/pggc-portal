import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Problem } from "src/problems/interfaces/problem.model";
import { Team } from "src/teams/interfaces/team.model";

@ObjectType()
export class ClarificationModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  question: string;

  @Field(() => String)
  answer?: string;

  @Field(() => Team)
  team: Team;

  @Field(() => Problem)
  problem: Problem;

  @Field(() => Boolean)
  isPublic: boolean;
}
