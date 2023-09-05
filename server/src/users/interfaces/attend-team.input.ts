import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AttendTeamInput {
  @Field({ nullable: false })
  userid: string;

  @Field({ nullable: false })
  teamId: number;
}
