import { useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { dialogVisibleVar, selectedVar } from '../../local-store'
import { Button } from 'primereact'
import { TextInput } from '../form'
import { GET_BILLERS, ADD_BILLER, UPDATE_BILLER } from '../../graphql'
import smallCheckers from '../../assets/tiny-checkers.png'
import { useEffect } from 'react'

export const BillerForm = () => {
  const [error, setError] = useState()
  const selected = useReactiveVar(selectedVar)
  const billerDialogVisible = useReactiveVar(dialogVisibleVar)
  const [addBiller, { data, error: addBillerError, loading: addBillerLoading, reset: resetAddBiller }] = useMutation(ADD_BILLER, {
    refetchQueries: [{ query: GET_BILLERS }],
  })
  const [updateBiller, { data: updateBillerData, updateBillerError, updateBillerLoading, reset: updateBillerReset }] = useMutation(UPDATE_BILLER, {
    refetchQueries: [{ query: GET_BILLERS }],
  })

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
    watch,
    reset,
  } = useForm({ defaultValues })

  console.log('watch', watch())

  useEffect(() => {
    setError(addBillerError || updateBillerError)
  }, [addBillerError, updateBillerError])

  const onSubmit = data => {
    console.log('submit', data)
    if (data.id) {
      updateBiller({ variables: { input: { id: data.id, name: data.name, website: data.website } }, onCompleted: data => dialogVisibleVar(false) })
    } else {
      addBiller({ variables: { input: { name: data.name, website: data.website } }, onCompleted: data => dialogVisibleVar(false) })
    }
  }

  if (error)
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
        <p style={{ width: 400 }}>{error.message}</p>
        <Button onClick={() => resetAddBiller()}>Try Again</Button>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <div className="col-6">
        <TextInput name="name" label="Biller Name" control={control} rules={{ required: "'Biller Name' is required!" }} />
        <TextInput name="website" label="WebSite" control={control} />
      </div>
      <div className="col-6">
        <img src={`/images/${selected.image}`} alt={'image_' + selected.id} />
      </div>
      <div className="p-dialog-footer pb-0 pt-5 pr-0">
        <Button className="p-button-text" onClick={() => dialogVisibleVar(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
