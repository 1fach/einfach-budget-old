import type { Meta, StoryObj } from '@storybook/react'

import BudgetPage from './BudgetPage'

const meta: Meta<typeof BudgetPage> = {
  component: BudgetPage,
}

export default meta

type Story = StoryObj<typeof BudgetPage>

export const Primary: Story = {}
