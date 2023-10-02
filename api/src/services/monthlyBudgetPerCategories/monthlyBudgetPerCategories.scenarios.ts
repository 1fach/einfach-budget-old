import type { Prisma, MonthlyBudgetPerCategory } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyBudgetPerCategoryCreateArgs>({
    monthlyBudgetPerCategory: {
      one: {
        data: {
          month: 5701250,
          year: 1129885,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 3291508,
              group: {
                create: {
                  name: 'String',
                  sortOrder: 2257137,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String4339610',
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
          month: 7216392,
          year: 4294965,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 9092253,
              group: {
                create: {
                  name: 'String',
                  sortOrder: 6181272,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String397109',
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
