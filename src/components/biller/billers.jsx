import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { selectedVar, dialogVisibleVar } from '../../local-store'
import { Button } from 'primereact/button'
import { Column, DataTable } from 'primereact'
import { Dialog } from '../dialog'
import { GET_BILLERS, DELETE_BILLER } from '../../graphql'
import { BillerForm } from './biller-form'

export const Billers = () => {
  const selected = useReactiveVar(selectedVar)
  const { data, loading, error } = useQuery(GET_BILLERS)
  const [deleteBiller, { data: deleteBillerData, loading: deleteBillerLoading, error: deleteBillerError }] = useMutation(DELETE_BILLER, {
    refetchQueries: [{ query: GET_BILLERS }],
  })

  return (
    <>
      <DataTable
        value={data?.billers}
        selected={selected}
        onSelectionChange={e => selectedVar(e.value)}
        selectionMode="single"
        loading={loading}
        header={
          <Button
            className="p-button-text"
            onClick={() => {
              selectedVar(null)
              dialogVisibleVar(true)
            }}
          >
            Add Biller
          </Button>
        }
        onDoubleClick={() => dialogVisibleVar(true)}
      >
        <Column field="name" />
        <Column
          field="website"
          body={rowData => (
            <a href={rowData?.website} target="_blank" rel="noreferrer" alt="Web Link" style={{ textDecoration: 'none' }}>
              {rowData?.website}
            </a>
          )}
        />
        <Column
          body={rowData =>
            selected?.id === rowData.id && (
              <a
                href="#"
                alt="delete record"
                onClick={() =>
                  deleteBiller({
                    variables: {
                      deleteBillerId: rowData.id,
                    },
                  })
                }
              >
                <i className="pi pi-times-circle" />
              </a>
            )
          }
        />
      </DataTable>
      <Dialog title={selected ? `Update biller: ${selected.name}` : 'Add Biller'}>
        <BillerForm />
      </Dialog>
    </>
  )
}
