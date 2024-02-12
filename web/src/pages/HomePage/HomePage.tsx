import { Metadata } from '@redwoodjs/web'

import { SpreadsheetSkeleton } from 'src/components/Spreadsheet'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <SpreadsheetSkeleton />
    </>
  )
}

export default HomePage
