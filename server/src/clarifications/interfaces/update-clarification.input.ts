import { Field, InputType } from "@nestjs/graphql";
import { Problem } from "src/problems/interfaces/problem.model";
import { Team } from "src/teams/interfaces/team.model";

@InputType()
export class UpdateClarificationInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  question: string;

  @Field({ nullable: true })
  answer?: string;

  @Field(() => Team, { nullable: false })
  team: Team;

  @Field(() => Problem, { nullable: false })
  problem: Problem;

  @Field({ nullable: false })
  isPublic: boolean;
}