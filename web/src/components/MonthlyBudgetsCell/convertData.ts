import type { FindBudgetByMonth } from 'types/graphql'

import type { Budget } from 'src/components/Spreadsheet/Table'

type BudgetGQL = FindBudgetByMonth['budget']
type BudgetGQLIntoDisplayable = (budget: BudgetGQL) => Budget[]

export const convertBudgetGQLIntoDisplayable: BudgetGQLIntoDisplayable = (
  budget: BudgetGQL
) => {
  const groups = budget.budgetCategoryGroups
  return groups.map((group) => {
    const categories = group.budgetCategories
    const subRows = categories.map((category) => {
      return {
        category: category.name,
        assigned: category.monthlyBudgetPerCategory[0].assigned,
        activity:
          category.monthlyBudgetPerCategory[0].monthlyCategoryActivity.activity,
        available:
          category.monthlyBudgetPerCategory[0].monthlyCategoryActivity
            .available,
      }
    })

    return {
      category: group.name,
      assigned: group.monthlyCategoryGroupActivity[0].assigned,
      activity: group.monthlyCategoryGroupActivity[0].activity,
      available: group.monthlyCategoryGroupActivity[0].available,
      subRows,
    }
  })
}
