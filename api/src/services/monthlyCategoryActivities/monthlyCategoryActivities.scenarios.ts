import type { Prisma, MonthlyCategoryActivity } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyCategoryActivityCreateArgs>({
    monthlyCategoryActivity: {
      one: {
        data: {
          monthlyBudgetPerCategory: {
            create: {
              month: 5205938,
              year: 3959816,
              budgetCategory: {
                create: {
                  name: 'String',
                  sortOrder: 8688470,
                  budgetCategoryGroup: {
                    create: {
                      name: 'String',
                      sortOrder: 5806731,
                      budget: {
                        create: {
                          name: 'String',
                          user: {
                            create: {
                              email: 'String2847542',
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
              month: 5166833,
              year: 3298251,
              budgetCategory: {
                create: {
                  name: 'String',
                  sortOrder: 5134249,
                  budgetCategoryGroup: {
                    create: {
                      name: 'String',
                      sortOrder: 9941462,
                      budget: {
                        create: {
                          name: 'String',
                          user: {
                            create: {
                              email: 'String6706599',
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
