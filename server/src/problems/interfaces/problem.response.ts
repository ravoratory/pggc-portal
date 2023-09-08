import { Field, ObjectType } from "@nestjs/graphql";

import { Problem } from "./problem.model";

@ObjectType("ProblemsResponse")
export class ProblemsReponse extends Problem {
  @Field()
  isSolved: boolean;
}
