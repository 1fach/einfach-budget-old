import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EinfachState {
  selectedBudgetId: string
  selectedMonth: number
  selectedYear: number
  actions: {
    updateBudgetId: (budgetId: string) => void
    updateMonth: (month: number) => void
    updateYear: (year: number) => void
  }
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useEinfachStore = create<EinfachState>()(
  persist(
    (set) => ({
      selectedBudgetId: '',
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      actions: {
        updateBudgetId: (budgetId: string) =>
          set({ selectedBudgetId: budgetId }),
        updateMonth: (month: number) => set({ selectedMonth: month }),
        updateYear: (year: number) => set({ selectedYear: year }),
      },
    }),
    {
      name: 'user-preferences', // name of the item in the storage (must be unique)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['actions'].includes(key))
        ),
    }
  )
)

export const useSelectedMonth = () =>
  useEinfachStore((state) => state.selectedMonth)
export const useSelectedYear = () =>
  useEinfachStore((state) => state.selectedYear)
export const useSelectedBudgetId = () =>
  useEinfachStore((state) => state.selectedBudgetId)

export const useEinfachActions = () => useEinfachStore((state) => state.actions)
