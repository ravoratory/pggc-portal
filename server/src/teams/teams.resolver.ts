import { Args, Mutation, Query, Int, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateTeamInput } from "./interfaces/create-team.input";
import { Team } from "./interfaces/team.model";
import { UpdateTeamInput } from "./interfaces/update-team.input";

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Team], { name: "teams", nullable: true })
  async getTeams() {
    return this.prismaService.team.findMany();
  }

  @Query(() => Team, { name: "team", nullable: true })
  async getTeam(@Args({ name: "teamId", type: () => Int }) teamId: number) {
    return this.prismaService.team.findFirst({
      where: {
        id: teamId,
      },
    });
  }

  @Mutation(() => Team)
  async createTeam(@Args("input") input: CreateTeamInput) {
    return this.prismaService.team.create({
      data: {
        name: input.name,
      },
    });
  }

  @Mutation(() => Team)
  async updateTeam(@Args("input") input: UpdateTeamInput) {
    return this.prismaService.team.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name === null ? undefined : input.name,
        score: input.score === null ? undefined : input.score,
      },
    });
  }

  @Mutation(() => Team)
  async deleteTeam(@Args({ name: "teamId", type: () => Int }) teamId: number) {
    return this.prismaService.team.delete({
      where: {
        id: teamId,
      },
    });
  }
}
