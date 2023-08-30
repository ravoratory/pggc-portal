import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Role } from "@prisma/client";

import { TeamModel } from "../../teams/interfaces/team.model"

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userid: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;

  @Field(() => TeamModel)
  team?: TeamModel;

  @Field(() => String)
  pgritId?: string

  @Field(() => String)
  githubId?: string
}

registerEnumType(Role, {
  name: "role",
});
