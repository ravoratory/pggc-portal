import { Test, TestingModule } from '@nestjs/testing';

import { ClarificationsResolver } from './clarifications.resolver';

describe('ClarificationsResolver', () => {
  let resolver: ClarificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClarificationsResolver],
    }).compile();

    resolver = module.get<ClarificationsResolver>(ClarificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
