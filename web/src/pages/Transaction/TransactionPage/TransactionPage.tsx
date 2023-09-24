import TransactionCell from 'src/components/Transaction/TransactionCell'

type TransactionPageProps = {
  id: string
}

const TransactionPage = ({ id }: TransactionPageProps) => {
  return <TransactionCell id={id} />
}

export default TransactionPage
