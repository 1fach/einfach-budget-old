import type { Prisma, MonthlyBudgetPerCategory } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyBudgetPerCategoryCreateArgs>({
    monthlyBudgetPerCategory: {
      one: {
        data: {
          month: 2419089,
          year: 7548281,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 5589645,
              budgetCategoryGroup: {
                create: {
                  name: 'String',
                  sortOrder: 1550088,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String706659',
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
          month: 2213810,
          year: 1446592,
          budgetCategory: {
            create: {
              name: 'String',
              sortOrder: 7474690,
              budgetCategoryGroup: {
                create: {
                  name: 'String',
                  sortOrder: 8815101,
                  budget: {
                    create: {
                      name: 'String',
                      user: {
                        create: {
                          email: 'String8757961',
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
