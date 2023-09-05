import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeamInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  score: number;
}
