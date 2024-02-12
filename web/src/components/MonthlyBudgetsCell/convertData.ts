import type { FindBudgetByMonth } from 'types/graphql'

import type { MonthlyBudget } from 'src/components/Spreadsheet/columns'

type MonthlyBudgetGQL = FindBudgetByMonth['budget']
type MonthlyBudgetGQLIntoDisplayable = (
  budget: MonthlyBudgetGQL
) => MonthlyBudget[]

// TODO do it on the server side
export const convertBudgetGQLIntoDisplayable: MonthlyBudgetGQLIntoDisplayable =
  (budget: MonthlyBudgetGQL) => {
    const groups = budget.budgetCategoryGroups
    return groups.map((group) => {
      const categories = group.budgetCategories
      const subRows = categories.map((category) => {
        return {
          id: category.id,
          category: category.name,
          assigned: category.monthlyBudgetPerCategory[0]?.assigned || 0,
          activity:
            category.monthlyBudgetPerCategory[0]?.monthlyCategoryActivity
              .activity || 0,
          available:
            category.monthlyBudgetPerCategory[0]?.monthlyCategoryActivity
              .available || 0,
        }
      })

      return {
        id: group.id,
        category: group.name,
        assigned: group.monthlyCategoryGroupActivity[0]?.assigned || 0,
        activity: group.monthlyCategoryGroupActivity[0]?.activity || 0,
        available: group.monthlyCategoryGroupActivity[0]?.available || 0,
        subRows,
      }
    })
  }
