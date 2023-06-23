import { useQuery, useReactiveVar } from '@apollo/client'
import { selectedVar, dialogVisibleVar } from '../../local-store'
import { Button } from 'primereact/button'
import { Column, DataTable } from 'primereact'
import { motion } from 'framer-motion'
import { Dialog } from '../dialog'
import { GET_EMPLOYERS } from '../../graphql'
import { ColumnDelete, currencyTemplate, ordinalTemplate, booleanTemplate } from '../common'
import { EmployerForm } from './employer-form'

export const Employers = () => {
  const selected = useReactiveVar(selectedVar)
  const { data, loading, error } = useQuery(GET_EMPLOYERS)
  console.log('selected', selected)
  return (
    <div className="flex">
      <motion.div layout style={{ width: selected ? '80%' : '100%' }}>
        <DataTable
          value={data?.employers}
          selected={selected}
          onSelectionChange={e => selectedVar(e.value)}
          selectionMode="single"
          loading={loading}
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
          onDoubleClick={() => dialogVisibleVar(true)}
        >
          <Column field="name" header="Employer" sortable />
          <Column field="paychecksPerYear" header="Yearly paychecks" sortable />
          <ColumnDelete action={e => window.alert('Clicky!')} />
        </DataTable>
        <Dialog title={selected ? `Update biller: ${selected.name}` : 'Add Bill'}>
          <EmployerForm />
        </Dialog>
      </motion.div>
    </div>
  )
}
