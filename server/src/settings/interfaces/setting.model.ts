import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SettingModel {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date)
  finishedAt: Date;
}
