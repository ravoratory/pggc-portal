import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProblemModel } from "src/problems/interfaces/problem.model";
import { TeamModel } from "src/teams/interfaces/team.model";

@ObjectType()
export class ClarificationModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  quesiton: string;

  @Field(() => String)
  answer?: string;

  @Field(() => TeamModel)
  team: TeamModel;

  @Field(() => ProblemModel)
  problem: ProblemModel;

  @Field(() => Boolean)
  isPublic: boolean;
}
