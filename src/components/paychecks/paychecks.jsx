import { useReactiveVar, useQuery } from '@apollo/client'
import { DataTable, Column, Button } from 'primereact'
import { GET_PAYCHECKS } from '../../graphql/paychecks'
import { selectedVar, dialogVisibleVar } from '../../local-store'
import { Dialog } from '../dialog'
import { PaycheckForm } from './paycheck-form'

export const Paychecks = () => {
  const selected = useReactiveVar(selectedVar)
  const { data, error, loading } = useQuery(GET_PAYCHECKS)

  return (
    <>
      <DataTable
        loading={loading}
        value={data?.paychecks}
        selected={selected}
        onChange={e => {
          selectedVar(e.value)
        }}
        header={
          <Button
            className="p-button-text"
            onClick={() => {
              // confetti()
              selectedVar(null)
              dialogVisibleVar(true)
            }}
          >
            Add New Bill
          </Button>
        }
      >
        <Column field="employer" header="Employer" sortable></Column>
      </DataTable>
      <Dialog title={selected ? `Update biller: ${selected.name}` : 'Add Bill'}>
        <PaycheckForm />
      </Dialog>
    </>
  )
}
