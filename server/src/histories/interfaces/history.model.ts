import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { JudgeStatus } from "@prisma/client";
import { ProblemModel } from "src/problems/interfaces/problem.model";
import { TeamModel } from "src/teams/interfaces/team.model";

registerEnumType(JudgeStatus, {
  name: "judgestatus"
})

@ObjectType()
export class HistoryModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  score: number;

  @Field(() => JudgeStatus)
  status: JudgeStatus

  @Field(() => TeamModel)
  team: TeamModel

  @Field(() => ProblemModel)
  problem: ProblemModel
}
