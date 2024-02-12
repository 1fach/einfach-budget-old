import { create } from 'zustand'

interface EinfachState {
  selectedMonth: number
  selectedYear: number
  actions: {
    updateMonth: (month: number) => void
    updateYear: (year: number) => void
  }
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useEinfachStore = create<EinfachState>((set) => ({
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  actions: {
    updateMonth: (month: number) => set({ selectedMonth: month }),
    updateYear: (year: number) => set({ selectedYear: year }),
  },
}))

export const useSelectedMonth = () =>
  useEinfachStore((state) => state.selectedMonth)
export const useSelectedYear = () =>
  useEinfachStore((state) => state.selectedYear)

export const useEinfachActions = () => useEinfachStore((state) => state.actions)
