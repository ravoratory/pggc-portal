import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateClarificationInput } from "src/clarifications/interfaces/create-clarification.input";
import { UpdateClarificationInput } from "src/clarifications/interfaces/update-clarification.input";
import { ClarificationModel } from "./interfaces/clarification.model";

@Resolver(() => ClarificationModel)
export class ClarificationsResolver {
    constructor(private readonly prismaService: PrismaService) { }

    @Query(() => [ClarificationModel], { name: "clarifications", nullable: true })
    async getClarifications() {
        return this.prismaService.clarification.findMany();
    }

    @Query(() => ClarificationModel, { name: "clarification", nullable: true })
    async getClarification(
        @Args({ name: "clarificationId", type: () => Int }) clarificationId: number,
    ) {
        return this.prismaService.clarification.findFirst({
            where: {
                id: clarificationId,
            },
        });
    }

    @Mutation(() => ClarificationModel)
    async createClarification(@Args("input") input: CreateClarificationInput) {
        return this.prismaService.clarification.create({
            data: {
                question: input.question,
                answer: input.answer,
                team: {
                    connect: {
                        id: input.team.id
                    }
                },
                problem: {
                    connect: {
                        id: input.problem.id
                    }
                },
                isPublic: input.isPublic,
            },
        });
    }

    @Mutation(() => ClarificationModel)
    async updateClarification(@Args("input") input: UpdateClarificationInput) {
        return this.prismaService.clarification.update({
            where: {
                id: input.id
            },
            data: {
                question: input.question,
                answer: input.answer,
                team: {
                    connect: {
                        id: input.team.id
                    }
                },
                problem: {
                    connect: {
                        id: input.problem.id
                    }
                },
                isPublic: input.isPublic,
            },
        });
    }

    @Mutation(() => ClarificationModel)
    async deleteClarification(
        @Args({ name: "clarificationId", type: () => Int }) clarificationId: number,
    ) {
        return this.prismaService.clarification.delete({
            where: {
                id: clarificationId,
            }
        });
    }
}
