import { Anchor } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

import classes from './Sidebar.module.css'

type SidebarBudgetLinkProps = {
  name: string
  budgetId: string
}

export const SidebarBudgetLink = ({
  name,
  budgetId,
}: SidebarBudgetLinkProps) => {
  return (
    <Anchor
      className={classes.collectionLink}
      component={Link}
      to={routes.budget({ id: budgetId })}
    >
      {name}
    </Anchor>
  )
}
