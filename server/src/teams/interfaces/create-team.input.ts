import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTeamInput {
  @Field({ nullable: false })
  name: string;
}
