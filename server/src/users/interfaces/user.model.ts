import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Role } from "@prisma/client";

import { Team } from "../../teams/interfaces/team.model"

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userid: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Team)
  team?: Team;

  @Field(() => String)
  pgritId?: string

  @Field(() => String)
  githubId?: string
}

registerEnumType(Role, {
  name: "role",
});
