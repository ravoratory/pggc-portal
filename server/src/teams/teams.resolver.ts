/* eslint-disable no-param-reassign */
import { Args, Mutation, Query, Int, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateTeamInput } from "./interfaces/create-team.input";
import { TeamMember } from "./interfaces/team-member.response";
import { Team } from "./interfaces/team.model";
import { UpdateTeamInput } from "./interfaces/update-team.input";

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [TeamMember], { name: "teams", nullable: true })
  async getTeams() {
    const teams = await this.prismaService.team.findMany();
    return teams.map(async (team: any) => {
      team.members = await this.prismaService.user.findMany({
        where: {
          teamId: team.id,
        },
      });
      return team;
    });
  }

  @Query(() => TeamMember, { name: "team", nullable: true })
  async getTeam(@Args({ name: "teamId", type: () => Int }) teamId: number) {
    const team = await this.prismaService.team.findFirst({
      where: {
        id: teamId,
      },
    });
    (team as any).members = await this.prismaService.user.findMany({
      where: {
        teamId: team.id,
      },
    });
    return team;
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
