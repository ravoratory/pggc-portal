import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Setting {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date)
  finishedAt: Date;
}
