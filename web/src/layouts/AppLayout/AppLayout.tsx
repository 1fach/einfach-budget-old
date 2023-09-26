import { Root, Header, Sidebar } from 'src/components/Layout/AppLayout'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Root
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <Root.Header>
        <Header />
      </Root.Header>
      <Root.Navbar px="md">
        <Sidebar />
      </Root.Navbar>
      <Root.Main>{children}</Root.Main>
    </Root>
  )
}

export default AppLayout
