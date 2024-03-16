import { Metadata } from '@redwoodjs/web'

type AccountPageProps = {
  budget: string
  account: string
}

const AccountPage = ({ budget, account }: AccountPageProps) => {
  return (
    <>
      <Metadata title="Account" description="Account page" />

      <h1>AccountPage</h1>
      <p>
        Find me in <code>./web/src/pages/AccountPage/AccountPage.tsx</code>
      </p>
      <p>
        My default route is named <code>account</code>, link to me with `
      </p>
    </>
  )
}

export default AccountPage
