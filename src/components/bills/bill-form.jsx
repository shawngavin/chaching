import { useState } from 'react'
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { dialogVisibleVar, selectedVar } from '../../local-store'
import { Button, Checkbox } from 'primereact'
import { TextInput } from '../form'
import { GET_BILLERS, ADD_BILLER, UPDATE_BILLER, GET_BILL_EDIT_LISTS } from '../../graphql'
import smallCheckers from '../../assets/tiny-checkers.png'
import { useEffect } from 'react'
import { ToggleButton } from '../form/toggle-button'

export const BillForm = () => {
  // const [error, setError] = useState()
  const selected = useReactiveVar(selectedVar)
  const { data: billListData, errors: billListErrors, loading: billListLoading } = useQuery(GET_BILL_EDIT_LISTS)
  // const billerDialogVisible = useReactiveVar(dialogVisibleVar)
  // const [
  //     addBiller,
  //     {
  //         data,
  //         error: addBillerError,
  //         loading: addBillerLoading,
  //         reset: resetAddBiller,
  //     },
  // ] = useMutation(ADD_BILLER, {
  //     refetchQueries: [{ query: GET_BILLERS }],
  // })
  // const [
  //     updateBiller,
  //     {
  //         data: updateBillerData,
  //         updateBillerError,
  //         updateBillerLoading,
  //         reset: updateBillerReset,
  //     },
  // ] = useMutation(UPDATE_BILLER, {
  //     refetchQueries: [{ query: GET_BILLERS }],
  // })

  const defaultValues = selected
    ? selected
    : {
        name: '',
        website: '',
      }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  // useEffect(() => {
  //     setError(addBillerError || updateBillerError)
  // }, [addBillerError, updateBillerError])

  const onSubmit = data => {
    //     console.log("submit", data)
    //     if (data.id) {
    //         updateBiller({ variables: { input: data } })
    //     } else {
    //         addBiller({ variables: { input: data } })
    //     }
    //     dialogVisibleVar(false)
  }

  // if (error)
  //     return (
  //         <div
  //             className='p-card  text-center surface-600 bg-purple-50'
  //             style={{
  //                 backgroundImage: `url(${smallCheckers})`,
  //                 padding: 25,
  //                 paddingBottom: 0,
  //             }}
  //         >
  //             <h3>Error!</h3>
  //             <p style={{ width: 400 }}>{error.message}</p>
  //             <Button onClick={() => resetAddBiller()}>Try Again</Button>
  //         </div>
  //     )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput name="name" label="Bill Name" control={control} rules={{ required: "'Bill Name' is required!" }} />
      <TextInput name="balance" label="Balance" control={control} />
      <TextInput name="minimumDue" label="Minimum Due" control={control} />
      <TextInput name="dueDay" label="Day Due" control={control} />
      <TextInput name="creditLimit" label="Credit Limit" control={control} />
      <TextInput name="balance" label="Balance" control={control} />
      <ToggleButton name="autoPay" label="Auto Pay" control={control} />

      <div className="p-dialog-footer pb-0 pt-5 pr-0">
        <Button className="p-button-text" onClick={() => dialogVisibleVar(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
