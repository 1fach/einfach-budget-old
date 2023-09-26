import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        description: 'String',
        account: {
          create: {
            nickname: 'String',
            payee: { create: { name: 'String' } },
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String2551246',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
        monthlyBudgetPerCategory: {
          create: {
            month: 7591421,
            year: 9043660,
            budgetCategory: {
              create: {
                name: 'String',
                sortOrder: 5237746,
                group: {
                  create: {
                    name: 'String',
                    sortOrder: 5844942,
                    budget: {
                      create: {
                        name: 'String',
                        user: {
                          create: {
                            email: 'String1645258',
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
        description: 'String',
        account: {
          create: {
            nickname: 'String',
            payee: { create: { name: 'String' } },
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String135632',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
        monthlyBudgetPerCategory: {
          create: {
            month: 6237863,
            year: 1899546,
            budgetCategory: {
              create: {
                name: 'String',
                sortOrder: 9292403,
                group: {
                  create: {
                    name: 'String',
                    sortOrder: 72734,
                    budget: {
                      create: {
                        name: 'String',
                        user: {
                          create: {
                            email: 'String5782942',
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

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
