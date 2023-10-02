import type { Prisma, MonthlyCategoryActivity } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyCategoryActivityCreateArgs>({
    monthlyCategoryActivity: {
      one: {
        data: {
          monthlyBudgetPerCategory: {
            create: {
              month: 4402389,
              year: 7704031,
              budgetCategory: {
                create: {
                  name: 'String',
                  sortOrder: 2793846,
                  group: {
                    create: {
                      name: 'String',
                      sortOrder: 9320586,
                      budget: {
                        create: {
                          name: 'String',
                          user: {
                            create: {
                              email: 'String6530505',
                              hashedPassword: 'String',
                              salt: 'String',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      two: {
        data: {
          monthlyBudgetPerCategory: {
            create: {
              month: 7252241,
              year: 7562683,
              budgetCategory: {
                create: {
                  name: 'String',
                  sortOrder: 2568381,
                  group: {
                    create: {
                      name: 'String',
                      sortOrder: 6821419,
                      budget: {
                        create: {
                          name: 'String',
                          user: {
                            create: {
                              email: 'String6091368',
                              hashedPassword: 'String',
                              salt: 'String',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

export type StandardScenario = ScenarioData<
  MonthlyCategoryActivity,
  'monthlyCategoryActivity'
>
