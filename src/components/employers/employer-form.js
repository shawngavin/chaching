import { useMemo, useState } from 'react'
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { dialogVisibleVar, selectedVar } from '../../local-store'
import { Button } from 'primereact'
import { TextInput, AutoComplete, ToggleButton } from '../form'
import { ADD_EMPLOYER, UPDATE_EMPLOYER, GET_EMPLOYERS } from '../../graphql'
import smallCheckers from '../../assets/tiny-checkers.png'
import { useEffect } from 'react'

export const EmployerForm = () => {
  const [billers, setBillers] = useState()

  // const [error, setError] = useState()
  const [employerQuery, setEmployerQuery] = useState('')

  const selected = useReactiveVar(selectedVar)

  const { data: listData, errors: listErrors, loading: listsLoading } = useQuery(GET_EMPLOYERS, { onCompleted: data => setBillers(data?.billEditLists.billers) })
  const [addBill, { data: addBillData, error: addBillError, loading: addBillLoading, reset: addBillReset }] = useMutation(ADD_EMPLOYER)
  const [updateBill, { data: updateBillData, error: updateBillError, loading: updateBillLoading, reset: updateBillReset }] = useMutation(UPDATE_EMPLOYER)

  useEffect(() => {
    if (listData) {
      setBillers([...listData.billEditLists.billers])
    }
  }, [listData])

  const defaultValues = selected ? selected : { name: '', billType: '', billerId: null, balance: '', minimumDue: '', dueDay: '', creditLimit: '', autoPay: true }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  const parseSaveData = data => {
    return Object.fromEntries(
      Object.keys(data).reduce((result, key) => {
        result.push(data[key] && typeof data[key] === 'object' ? [key, data[key].id] : [key, data[key]])
        return result
      }, [])
    )
  }

  const onSubmit = data => {
    console.log('submit', data)
    if (data.id) {
      updateBill({ variables: { input: parseSaveData(data) }, onCompleted: data => dialogVisibleVar(false) })
    } else {
      console.log('Save bill', parseSaveData(data))
      addBill({ variables: { input: parseSaveData(data) }, onCompleted: data => dialogVisibleVar(false) })
    }
    //dialogVisibleVar(false)
  }

  if (addBillError)
    return (
      <div
        className="p-card  text-center surface-600 bg-purple-50"
        style={{
          backgroundImage: `url(${smallCheckers})`,
          padding: 25,
          paddingBottom: 0,
        }}
      >
        <h3>Error!</h3>
        <p style={{ width: 400 }}>{addBillError.message}</p>
        <Button onClick={() => addBillReset()}>Try Again</Button>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="grid">
        <div className="col-4">
          <TextInput name="name" label="Bill Name" control={control} rules={{ required: "'Bill Name' is required!" }} autofocus />
        </div>
        <div className="col-4">
          <TextInput name="billType" label="Bill Type" control={control} />
        </div>
        <div className="col-4">
          <AutoComplete
            name="billerId"
            label="Biller"
            control={control}
            suggestions={billers?.filter(f => f.name.toLowerCase().includes(employerQuery))}
            completeMethod={e => setEmployerQuery(e.query)}
            dropdown
            forceSelection
            field="name"
          />
        </div>
      </div>
      <div className="grid">
        <div className="col-4">
          <TextInput name="name" label="Name" control={control} />
        </div>
        <div className="col-4">
          <TextInput name="paychecksPerYear" label="Paychecks Per Year" control={control} />
        </div>
        <div className="col-4">
          <TextInput name="dueDay" label="Day Due" control={control} />
        </div>
      </div>
      <div className="p-dialog-footer pb-0 pt-5 pr-0">
        <Button className="p-button-text" onClick={() => dialogVisibleVar(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
      <div>
        <Button className="p-button-text" type="button" onClick={e => reset(defaultValues)}>
          Reset
        </Button>
      </div>
    </form>
  )
}
