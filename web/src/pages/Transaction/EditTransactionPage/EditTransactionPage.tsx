import EditTransactionCell from 'src/components/Transaction/EditTransactionCell'

type TransactionPageProps = {
  id: string
}

const EditTransactionPage = ({ id }: TransactionPageProps) => {
  return <EditTransactionCell id={id} />
}

export default EditTransactionPage
