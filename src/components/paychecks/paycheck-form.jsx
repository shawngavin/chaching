import { useMutation, useReactiveVar } from '@apollo/client'
import { useFormik } from 'formik'
import { Button, InputText } from 'primereact'
import { ADD_PAYCHECK, GET_PAYCHECKS, UPDATE_PAYCHECK } from '../../graphql/paychecks'
import { selectedVar, dialogVisibleVar } from '../../local-store'
import { TextInput } from '../form/input-text'

export const PaycheckForm = () => {
  const selected = useReactiveVar(selectedVar)
  const [addPaycheck, { data, error, loading }] = useMutation(ADD_PAYCHECK)
  const [updatePaycheck, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PAYCHECK)

  const formik = useFormik({
    initialValues: selected
      ? selected
      : {
          employer: '',
          cycleInDays: '14',
          pay: '',
        },
    onSubmit: data => {
      if (data?.id) {
        updatePaycheck({
          variables: {
            input: data,
          },
          refetchQueries: [{ query: GET_PAYCHECKS }],
        })
      } else {
        addPaycheck({
          variables: {
            input: data,
          },
          refetchQueries: [{ query: GET_PAYCHECKS }],
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput name="employer" label="Employer" control={formik} />
      <TextInput name="cycleInDays" label="Days Between Paychecks" control={formik} />
      <TextInput name="pay" label="How much you get paid, fool?" control={formik} />

      <div className="p-dialog-footer pb-0 pt-5 pr-0">
        <Button className="p-button-text" onClick={() => dialogVisibleVar(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
