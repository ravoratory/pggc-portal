import { Field, InputType } from "@nestjs/graphql";
import { JudgeStatus } from "@prisma/client";
import { Problem } from "src/problems/interfaces/problem.model";
import { Team } from "src/teams/interfaces/team.model";

@InputType()
export class UpdateHistoryInput {
  @Field({ nullable: false })
  id: number;

  @Field(() => Team, { nullable: false })
  team: Team;

  @Field(() => Problem, { nullable: false })
  problem: Problem;

  @Field(() => JudgeStatus, { nullable: false })
  status: JudgeStatus;
}
