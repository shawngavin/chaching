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
        onSelectionChange={e => selectedVar(e.value)}
        selectionMode="single"
        onDoubleClick={() => dialogVisibleVar(true)}
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
        <Column field="cycleInDays" header="Paid every ___ Days" sortable></Column>
        <Column field="pay" header="Amount Paid" sortable></Column>
      </DataTable>
      <Dialog title={selected ? `Update biller: ${selected.name}` : 'Add Paycheck'}>
        <PaycheckForm />
      </Dialog>
    </>
  )
}
