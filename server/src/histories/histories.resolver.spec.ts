import { Test, TestingModule } from "@nestjs/testing";

import { HistoriesResolver } from "./histories.resolver";

describe("HistoriesResolver", () => {
  let resolver: HistoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriesResolver],
    }).compile();

    resolver = module.get<HistoriesResolver>(HistoriesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
