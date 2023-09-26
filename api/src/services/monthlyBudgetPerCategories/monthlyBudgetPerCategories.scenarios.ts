import type { Prisma, MonthlyBudgetPerCategory } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyBudgetPerCategoryCreateArgs>({
    monthlyBudgetPerCategory: {
      one: {
        data: {
          month: 2792091,
          year: 667135,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 4259853,
              group: {
                create: {
                  name: 'String',
                  sortOrder: 7891830,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String9755420',
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
      two: {
        data: {
          month: 3956920,
          year: 9821122,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 1981623,
              group: {
                create: {
                  name: 'String',
                  sortOrder: 8310343,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String6377353',
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
  })

export type StandardScenario = ScenarioData<
  MonthlyBudgetPerCategory,
  'monthlyBudgetPerCategory'
>
