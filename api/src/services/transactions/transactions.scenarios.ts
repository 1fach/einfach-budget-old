import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        description: 'String',
        account: {
          create: {
            nickname: 'String9748614',
            payee: { create: { name: 'String4723737' } },
          },
        },
        budgetCategory: {
          create: {
            monthlyBudget: {
              create: {
                month: 4945203,
                year: 7512391,
                budget: {
                  create: {
                    name: 'String561368',
                    user: {
                      create: {
                        email: 'String7938640',
                        hashedPassword: 'String',
                        salt: 'String',
                      },
                    },
                  },
                },
              },
            },
            budgetCategory: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        description: 'String',
        account: {
          create: {
            nickname: 'String3931378',
            payee: { create: { name: 'String8745163' } },
          },
        },
        budgetCategory: {
          create: {
            monthlyBudget: {
              create: {
                month: 4360017,
                year: 1243302,
                budget: {
                  create: {
                    name: 'String4596294',
                    user: {
                      create: {
                        email: 'String9817178',
                        hashedPassword: 'String',
                        salt: 'String',
                      },
                    },
                  },
                },
              },
            },
            budgetCategory: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
