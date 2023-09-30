import { styled } from 'styled/jsx'

import { Table } from './Table'

export const Spreadsheet = () => {
  return (
    <styled.div height="100dvh" overflow="hidden">
      <Header />
      <styled.div display="flex" width="full" height="full">
        <BudgetTable />
        <Inspector />
      </styled.div>
    </styled.div>
  )
}

const Header = () => {
  return (
    <styled.header
      height="1/6"
      bgColor="gray.100"
      borderBottomWidth="thin"
      borderBottomColor="gray.200"
    ></styled.header>
  )
}

const BudgetTable = () => {
  return (
    <styled.section flex={1}>
      <Table />
    </styled.section>
  )
}

const Inspector = () => {
  return (
    <styled.aside
      width="1/3"
      bgColor="gray.100"
      borderLeftWidth="thin"
      borderLeftColor="gray.200"
    ></styled.aside>
  )
}
