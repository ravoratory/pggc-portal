import { createHash } from "node:crypto";

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { AttendTeamInput } from "./interfaces/attend-team.input";
import { CreateUserInput } from "./interfaces/create-user.input";
import { UpdateUserInput } from "./interfaces/update-user.input";
import { User } from "./interfaces/user.model";

@Resolver(() => CreateUserInput)
export class UsersResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [User], { name: "users", nullable: true })
  async getUsers() {
    return this.prismaService.user.findMany();
  }

  @Query(() => User, { name: "user", nullable: true })
  async getUser(@Args({ name: "Id", type: () => Number }) Id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id: Id,
      },
    });
  }

  @Mutation(() => User)
  async createUser(@Args("input") input: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        userid: input.userId,
        pgritId: input.pgritId,
        githubId: input.githubId,
        password: createHash("sha256").update(input.password).digest("hex"),
      },
    });
  }

  @Mutation(() => User)
  async updateUser(@Args("input") input: UpdateUserInput) {
    return this.prismaService.user.update({
      where: {
        id: input.Id,
      },
      data: {
        userid: input.userId,
        pgritId: input.pgritId,
        githubId: input.githubId,
        password: input.password,
        role: input.role,
      },
    });
  }

  @Mutation(() => User)
  async deleteUser(@Args({ name: "Id", type: () => Number }) Id: number) {
    return this.prismaService.user.delete({
      where: {
        id: Id,
      },
    });
  }

  @Mutation(() => User)
  async attendTeam(@Args("input") input: AttendTeamInput) {
    const team = await this.prismaService.team.findFirstOrThrow({
      where: {
        id: input.teamId,
      },
    });
    return this.prismaService.user.update({
      where: {
        userid: input.userid,
      },
      data: {
        teamId: team.id,
      },
      include: {
        team: true
      }
    });
  }
}
