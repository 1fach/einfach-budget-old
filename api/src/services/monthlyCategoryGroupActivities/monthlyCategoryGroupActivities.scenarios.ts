import type { Prisma, MonthlyCategoryGroupActivity } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.MonthlyCategoryGroupActivityCreateArgs>({
    monthlyCategoryGroupActivity: {
      one: {
        data: {
          month: 9921351,
          year: 7544512,
          budgetCategoryGroup: {
            create: {
              name: 'String',
              sortOrder: 8611252,
              budget: {
                create: {
                  name: 'String',
                  user: {
                    create: {
                      email: 'String3126439',
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
      two: {
        data: {
          month: 9080116,
          year: 6858512,
          budgetCategoryGroup: {
            create: {
              name: 'String',
              sortOrder: 8344299,
              budget: {
                create: {
                  name: 'String',
                  user: {
                    create: {
                      email: 'String2743081',
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
  })

export type StandardScenario = ScenarioData<
  MonthlyCategoryGroupActivity,
  'monthlyCategoryGroupActivity'
>
