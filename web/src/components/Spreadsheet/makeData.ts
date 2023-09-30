import { faker } from '@faker-js/faker'

export type Budget = {
  category: string
  assigned: number
  activity: number
  available: number
  subRows?: Budget[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newBudget = (): Budget => {
  const assigned = faker.number.int(10000)
  const activity = faker.number.int(assigned)
  return {
    category: faker.commerce.department(),
    assigned,
    activity,
    available: assigned - activity,
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Budget[] => {
    const len = lens[depth]
    return range(len).map((): Budget => {
      return {
        ...newBudget(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
