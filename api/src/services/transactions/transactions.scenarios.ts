import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        description: 'String',
        date: new Date(),
        inflow: 0,
        outflow: 200,
        account: {
          create: {
            nickname: 'String',
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String1612728',
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
            month: 3024158,
            year: 1527287,
            budgetCategory: {
              create: {
                name: 'String',
                sortOrder: 6054463,
                budgetCategoryGroup: {
                  create: {
                    name: 'String',
                    sortOrder: 4046386,
                    budget: {
                      create: {
                        name: 'String',
                        user: {
                          create: {
                            email: 'String9612380',
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
        date: new Date(),
        inflow: 500,
        outflow: 0,
        account: {
          create: {
            nickname: 'String',
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String2272597',
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
            month: 1201545,
            year: 6855835,
            budgetCategory: {
              create: {
                name: 'String',
                sortOrder: 9651400,
                budgetCategoryGroup: {
                  create: {
                    name: 'String',
                    sortOrder: 9269511,
                    budget: {
                      create: {
                        name: 'String',
                        user: {
                          create: {
                            email: 'String6384726',
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
