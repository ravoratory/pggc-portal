import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { JudgeStatus } from "@prisma/client";
import { Problem } from "src/problems/interfaces/problem.model";
import { Team } from "src/teams/interfaces/team.model";

registerEnumType(JudgeStatus, {
  name: "judgestatus",
});

@ObjectType()
export class HistoryModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  score: number;

  @Field(() => JudgeStatus)
  status: JudgeStatus;

  @Field(() => Team, { nullable: true })
  team: Team;

  @Field(() => Problem, { nullable: true })
  problem: Problem;

  @Field(() => Date)
  createdAt: Date;
}
