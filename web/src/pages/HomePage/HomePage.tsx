import { Metadata } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Spreadsheet />
    </>
  )
}

export default HomePage
