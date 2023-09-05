import { Field, InputType } from "@nestjs/graphql";
import { JudgeStatus } from "@prisma/client";
@InputType()
export class UpdateHistoryInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  teamId: number;

  @Field({ nullable: false })
  problemId: number;

  @Field({ nullable: true })
  score: number;

  @Field(() => JudgeStatus, { nullable: true })
  status: JudgeStatus;
}
