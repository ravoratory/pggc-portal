import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateClarificationInput {
  @Field({ nullable: false })
  question: string;

  @Field({ nullable: true })
  answer: string;

  @Field(() => Int, { nullable: false })
  teamId: number;

  @Field(() => Int, { nullable: false })
  problemId: number;

  @Field({ nullable: false })
  isPublic: boolean;
}
