import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/interfaces/user.model";

import { Team } from "./team.model";

@ObjectType("TeamMember")
export class TeamMember extends Team {
  @Field(() => [User])
  members: [User];
}
