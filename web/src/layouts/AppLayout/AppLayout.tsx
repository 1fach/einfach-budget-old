import { Root, Sidebar } from 'src/components/Layout/AppLayout'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Root
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      padding={0}
    >
      <Root.Navbar px="md">
        <Sidebar />
      </Root.Navbar>
      <Root.Main>{children}</Root.Main>
    </Root>
  )
}

export default AppLayout
