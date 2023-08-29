import { Test, TestingModule } from "@nestjs/testing";

import { ProblemsResolver } from "./problems.resolver";

describe("ProblemsResolver", () => {
  let resolver: ProblemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemsResolver],
    }).compile();

    resolver = module.get<ProblemsResolver>(ProblemsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
