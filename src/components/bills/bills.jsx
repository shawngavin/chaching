import React, { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { selectedVar, dialogVisibleVar, errorDialogVisibleVar } from '../../local-store'
import { Button } from 'primereact/button'
import { Column, DataTable } from 'primereact'
import { motion } from 'framer-motion'
import { Dialog, ErrorDialog } from '../dialog'
import { GET_BILLS } from '../../graphql'
import { ColumnDelete, currencyTemplate, ordinalTemplate, booleanTemplate } from '../common'
import { BillForm } from './bill-form'
import { BillDisplay } from './bill'

export const Bills = () => {
  const selected = useReactiveVar(selectedVar)
  const [uiError, setUiError] = useState(false)
  const { data, loading, errors } = useQuery(GET_BILLS, { errorPolicy: 'all' })

  // console.log('selected', selected)

  useEffect(() => {
    // console.log('data', data)
  }, [data])

  // useEffect(() => {
  //   if (errors !== null || errors !== undefined) {
  //     console.log('error', errors)
  //     setUiError(errors)
  //   }
  // }, [errors])
  const updatedBodyTemplate = bill => {
    if (bill.updated) {
      return <span>{new Date(bill.updated).toLocaleDateString()}</span>
    }
    return null
  }
  return (
    <div className="flex">
      <motion.div layout style={{ width: selected ? '80%' : '100%' }}>
        <DataTable
          value={data?.bills?.filter(bill => bill)}
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
          <Column field="name" header="Bill" sortable />
          <Column field="balance.amount" header="Current Balance" sortable body={rowData => currencyTemplate({ rowData, field: 'balance.amount' })} />
          <Column field="minimumDue" header="Minimum Due" sortable body={rowData => currencyTemplate({ rowData, field: 'minimumDue' })} />
          <Column field="dayDue" header="Day Due" sortable sort body={rowData => ordinalTemplate({ rowData, field: 'dueDay' })} />
          <Column field="creditLimit" header="Credit Limit" sortable body={rowData => currencyTemplate({ rowData, field: 'creditLimit' })} />
          <Column field="autoPay" header="Auto Pay" sortable body={rowData => booleanTemplate({ rowData, field: 'autoPay' })} />
          <Column field="autoPayType" header="Autopay Type" sortable bodyClassName="c-capitalize" />
          <Column field="biller.name" header="Biller" sortable />
          <Column field="billType" header="Type" sortable bodyClassName="c-capitalize" />
          <Column field="updated" header="Last Updated" sortable bodyClassName="c-capitalize" body={updatedBodyTemplate} />
          <ColumnDelete action={e => window.alert('Clicky!')} />
        </DataTable>
        <Dialog title={selected ? `Update bill: ${selected.name}` : 'Add Bill'}>
          <BillForm />
        </Dialog>
        <ErrorDialog title="Bill Error" error={errors} onHide={() => errorDialogVisibleVar(false)} />
      </motion.div>
      <motion.div layout style={{ width: selected ? '20%' : 0, backgroundColor: '#f9f5ff' }}>
        <Button className="p-button-text" onClick={() => selectedVar(null)}>
          Close
        </Button>
        <BillDisplay />
      </motion.div>
    </div>
  )
}
