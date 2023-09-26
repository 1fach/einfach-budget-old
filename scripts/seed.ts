import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

const deleteAllTablesData = async () => {
  await db.transaction.deleteMany()
  console.log('Deleted records in transaction table')

  await db.account.deleteMany()
  console.log('Deleted records in account table')

  await db.payee.deleteMany()
  console.log('Deleted records in payee table')

  await db.monthlyBudgetPerCategory.deleteMany()
  console.log('Deleted records in monthlyBudgetPerCategory table')

  await db.budgetCategory.deleteMany()
  console.log('Deleted records in budgetCategory table')

  await db.budgetCategoryGroup.deleteMany()
  console.log('Deleted records in budgetCategoryGroup table')

  await db.budget.deleteMany()
  console.log('Deleted records in budget table')

  await db.user.deleteMany()
  console.log('Deleted records in user table')
}

const populateTable = async () => {
  console.log('========= START POPULATING TABLES =========')
  for (let i = 0; i < 10; i++) {
    const [hashedPassword, salt] = hashPassword(faker.internet.password())
    const data: Prisma.UserCreateInput = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      hashedPassword,
      salt,
    }
    const user = await db.user.create({ data: data })
    console.log('Created user ' + user.id)

    await createBudgetsForUser(user.id, 2)
  }
  console.log('========= END POPULATING TABLES =========')
}

const createBudgetsForUser = async (userId, count) => {
  for (let i = 0; i < count; i++) {
    const data: Prisma.BudgetUncheckedCreateInput = {
      name: faker.lorem.words(3),
      userId: userId,
    }

    const budget = await db.budget.create({ data: data })
    console.log('Created budget ' + budget.id)

    const accounts = await createAccountsForBudget(budget.id, 3)

    const monthlyBudgets = await createBudgetCategoryGroupForBudget(
      budget.id,
      2
    )
    const flatMonthlyBudgets = monthlyBudgets.flat(4)

    for (const monthlyBudget of flatMonthlyBudgets) {
      await createTransactionFromAllAccounts(monthlyBudget.id, accounts, 2)
    }
  }
}

async function createTransactionFromAllAccounts(
  monthlyBudgetId,
  accounts,
  count
) {
  console.log('== Start Create Transactions ==')
  for (const account of accounts) {
    const balance = 100000
    const inflow: Prisma.TransactionUncheckedCreateInput = {
      description: 'Inflow Balance',
      date: faker.date.between({
        from: '2023-09-01T00:00:00.000Z',
        to: '2023-12-31T00:00:00.000Z',
      }),
      outflow: 0,
      inflow: balance,
      cleared: true,
      monthlyBudgetPerCategoryId: monthlyBudgetId,
      accountId: account.id,
    }
    await db.transaction.create({ data: inflow })
    console.log('Created inflow for a account ' + account.id)

    for (let i = 0; i < count; i++) {
      const data: Prisma.TransactionUncheckedCreateInput = {
        description: faker.finance.transactionDescription(),
        date: faker.date.between({
          from: '2023-09-01T00:00:00.000Z',
          to: '2023-12-31T00:00:00.000Z',
        }),
        outflow: faker.finance.amount({
          min: balance / (count + 5),
          max: balance / count,
        }),
        inflow: 0,
        cleared: faker.datatype.boolean(0.25),
        monthlyBudgetPerCategoryId: monthlyBudgetId,
        accountId: account.id,
      }

      const transaction = await db.transaction.create({ data: data })
      console.log('Created transaction ' + transaction.id)
    }
  }
  console.log('== End Create Transactions ==')
}

async function createBudgetCategoryGroupForBudget(budgetId, count) {
  const created = []
  for (let i = 0; i < count; i++) {
    const data: Prisma.BudgetCategoryGroupUncheckedCreateInput = {
      name: faker.commerce.department(),
      sortOrder: faker.number.int(10000),
      budgetId: budgetId,
    }

    const group = await db.budgetCategoryGroup.create({ data: data })
    console.log('Created category group ' + group.id)

    const monthlyBudgets = await createBudgetCategoryForGroup(group.id, 2)
    created.push(monthlyBudgets)
  }

  return created
}

async function createBudgetCategoryForGroup(categoryGroupId, count) {
  const created = []
  for (let i = 0; i < count; i++) {
    const data: Prisma.BudgetCategoryUncheckedCreateInput = {
      name: faker.commerce.department(),
      sortOrder: faker.number.int(10000),
      groupId: categoryGroupId,
    }

    const category = await db.budgetCategory.create({ data: data })
    console.log('Created category ' + category.id)

    const monthlyBudgets = await createMonthlyBudgetPerCategoryForCategory(
      category.id
    )

    created.push(monthlyBudgets)
  }

  return created
}

async function createMonthlyBudgetPerCategoryForCategory(categoryId) {
  const created = []
  for (let i = 9; i <= 12; i++) {
    const data: Prisma.MonthlyBudgetPerCategoryUncheckedCreateInput = {
      month: i,
      year: 2023,
      assigned: faker.finance.amount(),
      budgetCategoryId: categoryId,
    }

    const monthlyBudget = await db.monthlyBudgetPerCategory.create({
      data: data,
    })
    console.log('Created monthly budget ' + monthlyBudget.id)

    created.push(monthlyBudget)
  }

  return created
}

async function createAccountsForBudget(budgetId, count) {
  const created = []
  for (let i = 0; i < count; i++) {
    const accName = faker.lorem.words(3)

    const payee = await db.payee.create({
      data: {
        name: accName,
      },
    })
    console.log('Created payee ' + payee.id)

    const data: Prisma.AccountUncheckedCreateInput = {
      nickname: accName,
      budgetId: budgetId,
      payeeId: payee.id,
    }

    const account = await db.account.create({ data: data })
    console.log('Created account ' + account.id)
    created.push(account)
  }

  return created
}

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`

    // clear all database
    await deleteAllTablesData()

    // populate tables with relationships
    await populateTable()

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.error(error)
  }
}
