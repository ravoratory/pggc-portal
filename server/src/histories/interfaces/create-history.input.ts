import { Field, InputType } from "@nestjs/graphql";
import { JudgeStatus } from "@prisma/client";

@InputType()
export class CreateHistoryInput {
  @Field({ nullable: false })
  teamId: number;

  @Field({ nullable: false })
  problemId: number;

  @Field({ nullable: false })
  score: number;

  @Field(() => JudgeStatus, { nullable: false })
  status: JudgeStatus;
}
