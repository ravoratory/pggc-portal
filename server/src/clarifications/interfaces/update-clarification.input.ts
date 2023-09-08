import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateClarificationInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  answer?: string;

  @Field(() => Int, { nullable: true })
  teamId: number;

  @Field(() => Int, { nullable: true })
  problemId: number;

  @Field({ nullable: false })
  isPublic: boolean;
}
