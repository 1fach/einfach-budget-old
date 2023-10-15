import { css } from '@one-ui/styled-system/css'
import { Grid, GridItem } from '@one-ui/styled-system/jsx'

import { NavigationMenu, Sidebar } from 'src/components/AppLayout'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={css({ display: 'none', md: { display: 'block' } })}>
      <NavigationMenu />
      <div>
        <div className={css({ bg: 'background' })}>
          <Grid gridTemplateColumns={{ lg: '6' }}>
            <Sidebar
              className={css({ display: 'none', lg: { display: 'block' } })}
            />
            <GridItem colSpan={5} borderLeftWidth={{ lg: '1px' }}>
              {children}
            </GridItem>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
