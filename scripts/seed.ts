import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { customAlphabet } from 'nanoid'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 12)

type TestDataType = {
  users?: Prisma.UserCreateManyInput[]
  budgets?: Prisma.BudgetCreateManyInput[]
  accounts?: Prisma.AccountCreateManyInput[]
  payees?: Prisma.PayeeCreateManyInput[]
  categoryGroups?: Prisma.BudgetCategoryGroupCreateManyInput[]
  categories?: Prisma.BudgetCategoryCreateManyInput[]
  monthlyBudgets?: Prisma.MonthlyBudgetPerCategoryCreateManyInput[]
  transactions?: Prisma.TransactionCreateManyInput[]
}

const testData: TestDataType = {}

const deleteAllTablesData = async () => {
  console.log('========= START CLEARING TABLES =========')
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
  console.log('========= END CLEARING TABLES =========')
  console.log()
}

const populateTable = async () => {
  console.log('========= START PREPARING TESTDATA =========')
  testData.users = createUserData(2)
  console.log(testData.users.length + ' users are prepared')

  testData.budgets = createBudgetsForUser(2)
  console.log(testData.budgets.length + ' budgets are prepared')

  const { accounts, payees } = createAccountsPayeesForBudget(2)
  testData.accounts = accounts
  console.log(testData.accounts.length + ' accounts are prepared')

  testData.payees = payees
  console.log(testData.payees.length + ' payees are prepared')

  testData.categoryGroups = createBudgetCategoryGroupForBudget(2)
  console.log(testData.categoryGroups.length + ' category groups are prepared')

  testData.categories = createBudgetCategoryForGroup(3)
  console.log(testData.categories.length + ' categories are prepared')

  testData.monthlyBudgets = createMonthlyBudgetPerCategoryForCategory(
    9,
    12,
    2023
  )
  console.log(testData.monthlyBudgets.length + ' monthly budgets are prepared')

  testData.transactions = createTransactionFromAllAccounts(1)
  console.log(testData.transactions.length + ' transactions are prepared')
  console.log('========= END PREPARING TESTDATA =========')
  console.log()

  console.log('========= START IMPORTING USERS =========')
  console.log(testData.users.length + ' users are going to be imported.')
  const userRes = await db.user.createMany({ data: testData.users })
  console.log(userRes.count + ' users have been successfully imported.')
  console.log('========= END IMPORTING USERS =========')
  console.log()

  console.log('========= START IMPORTING BUDGETS =========')
  console.log(testData.budgets.length + ' budgets are going to be imported.')
  const budgetRes = await db.budget.createMany({ data: testData.budgets })
  console.log(budgetRes.count + ' budgets have been successfully imported.')
  console.log('========= END IMPORTING BUDGETS =========')
  console.log()

  console.log('========= START IMPORTING PAYEES =========')
  console.log(testData.payees.length + ' payees are going to be imported.')
  const payeeRes = await db.payee.createMany({ data: testData.payees })
  console.log(payeeRes.count + ' payees have been successfully imported.')
  console.log('========= END IMPORTING PAYEES =========')
  console.log()

  console.log('========= START IMPORTING ACCOUNTS =========')
  console.log(testData.accounts.length + ' accounts are going to be imported.')
  const accountRes = await db.account.createMany({ data: testData.accounts })
  console.log(accountRes.count + ' accounts have been successfully imported.')
  console.log('========= END IMPORTING ACCOUNTS =========')
  console.log()

  console.log('========= START IMPORTING CATEGORY GROUPS =========')
  console.log(
    testData.categoryGroups.length +
      ' category groups are going to be imported.'
  )
  const categoryGroupRes = await db.budgetCategoryGroup.createMany({
    data: testData.categoryGroups,
  })
  console.log(
    categoryGroupRes.count + ' category groups have been successfully imported.'
  )
  console.log('========= END IMPORTING CATEGORY GROUPS =========')
  console.log()

  console.log('========= START IMPORTING CATEGORY =========')
  console.log(
    testData.categories.length + ' categories are going to be imported.'
  )
  const categoryRes = await db.budgetCategory.createMany({
    data: testData.categories,
  })
  console.log(
    categoryRes.count + ' categories have been successfully imported.'
  )
  console.log('========= END IMPORTING CATEGORY =========')
  console.log()

  console.log('========= START IMPORTING MONTHLY BUDGETS =========')
  console.log(
    testData.monthlyBudgets.length +
      ' monthly budgets are going to be imported.'
  )
  const monthlyBudgetRes = await db.monthlyBudgetPerCategory.createMany({
    data: testData.monthlyBudgets,
  })
  console.log(
    monthlyBudgetRes.count + ' monthly budgets have been successfully imported.'
  )
  console.log('========= END IMPORTING MONTHLY BUDGETS =========')
  console.log()

  console.log('========= START IMPORTING TRANSACTIONS =========')
  console.log(
    testData.transactions.length + ' transactions are going to be imported.'
  )
  const transactionRes = await db.transaction.createMany({
    data: testData.transactions,
  })
  console.log(
    transactionRes.count + ' transactions have been successfully imported.'
  )
  console.log('========= END IMPORTING TRANSACTIONS =========')
  console.log()
}

function createUserData(count) {
  const users: Prisma.UserCreateManyInput[] = []
  for (let i = 0; i < count; i++) {
    const [hashedPassword, salt] = hashPassword(faker.internet.password())
    const user: Prisma.UserCreateManyInput = {
      id: nanoid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      hashedPassword,
      salt,
    }
    users.push(user)
  }

  const [hashedPassword, salt] = hashPassword('test123')
  users.push({
    id: 'mptmfq7BPqk8',
    name: faker.person.fullName(),
    email: 'testrw@einfach.com',
    hashedPassword,
    salt,
  })

  return users
}

function createBudgetsForUser(count) {
  const budgets: Prisma.BudgetCreateManyInput[] = []
  for (const user of testData.users) {
    for (let i = 0; i < count; i++) {
      const budget: Prisma.BudgetCreateManyInput = {
        id: nanoid(),
        name: faker.animal.dog(),
        userId: user.id,
      }
      budgets.push(budget)
    }
  }

  return budgets
}

function createTransactionFromAllAccounts(count) {
  const transactions: Prisma.TransactionCreateManyInput[] = []

  for (const monthlyBudget of testData.monthlyBudgets) {
    for (const account of testData.accounts) {
      const balance = 10000 * 1000000
      const inflow: Prisma.TransactionCreateManyInput = {
        id: nanoid(),
        description: 'Inflow Balance',
        date: faker.date.between({
          from: '2023-09-01T00:00:00.000Z',
          to: '2023-12-31T00:00:00.000Z',
        }),
        outflow: 0,
        inflow: balance,
        cleared: true,
        monthlyBudgetPerCategoryId: monthlyBudget.id,
        accountId: account.id,
      }
      transactions.push(inflow)

      for (let i = 0; i < count; i++) {
        const outflow: Prisma.TransactionCreateManyInput = {
          id: nanoid(),
          description: faker.finance.transactionDescription(),
          date: faker.date.between({
            from: '2023-09-01T00:00:00.000Z',
            to: '2023-12-31T00:00:00.000Z',
          }),
          outflow: faker.number.bigInt({
            min: 10 * 1000000,
            max: 100 * 1000000,
          }),
          inflow: 0,
          cleared: faker.datatype.boolean(0.25),
          monthlyBudgetPerCategoryId: monthlyBudget.id,
          accountId: account.id,
        }
        transactions.push(outflow)
      }
    }
  }

  return transactions
}

function createBudgetCategoryGroupForBudget(count) {
  const categoryGroups: Prisma.BudgetCategoryGroupCreateManyInput[] = []
  for (const budget of testData.budgets) {
    for (let i = 0; i < count; i++) {
      const group: Prisma.BudgetCategoryGroupCreateManyInput = {
        id: nanoid(),
        name: faker.word.noun(),
        sortOrder: faker.number.int(10000),
        budgetId: budget.id,
      }
      categoryGroups.push(group)
    }
  }

  return categoryGroups
}

function createBudgetCategoryForGroup(count) {
  const categories: Prisma.BudgetCategoryCreateManyInput[] = []
  for (const categoryGroup of testData.categoryGroups) {
    for (let i = 0; i < count; i++) {
      const category: Prisma.BudgetCategoryCreateManyInput = {
        id: nanoid(),
        name: faker.word.noun(),
        sortOrder: faker.number.int(10000),
        budgetCategoryGroupId: categoryGroup.id,
      }
      categories.push(category)
    }
  }

  return categories
}

function createMonthlyBudgetPerCategoryForCategory(monthStart, monthEnd, year) {
  const monthlyBudgets: Prisma.MonthlyBudgetPerCategoryCreateManyInput[] = []

  for (const category of testData.categories) {
    for (let i = monthStart; i <= monthEnd; i++) {
      const monthlyBudget: Prisma.MonthlyBudgetPerCategoryCreateManyInput = {
        id: nanoid(),
        month: i,
        year: year,
        assigned: 3000 * 1000000,
        budgetCategoryId: category.id,
      }
      monthlyBudgets.push(monthlyBudget)
    }
  }

  return monthlyBudgets
}

function createAccountsPayeesForBudget(count) {
  const payees: Prisma.PayeeCreateManyInput[] = []
  const accounts: Prisma.AccountCreateManyInput[] = []

  for (const budget of testData.budgets) {
    for (let i = 0; i < count; i++) {
      const accName = faker.word.noun()

      const payee: Prisma.PayeeCreateManyInput = {
        id: nanoid(),
        name: accName,
        budgetId: budget.id,
      }
      payees.push(payee)

      const account: Prisma.AccountCreateManyInput = {
        id: nanoid(),
        nickname: accName,
        budgetId: budget.id,
        payeeId: payee.id,
      }
      accounts.push(account)
    }
  }

  return { accounts, payees }
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
  } catch (error) {
    console.error(error)
  }
}
