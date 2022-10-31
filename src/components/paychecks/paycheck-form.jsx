import { useMutation, useReactiveVar } from '@apollo/client'
import { useFormik } from 'formik'
import { Button, InputText } from 'primereact'
import { selectedVar, dialogVisibleVar } from '../../local-store'

export const PaycheckForm = () => {
  const selected = useReactiveVar(selectedVar)

  const formik = useFormik({
    initialValues: {
      employer: '',
      cycleInDays: '14',
      pay: '',
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="employer">Employer</label>
      <InputText id="employer" name="employer" onChange={formik.handleChange} value={formik.values.employer} />
      <div className="p-dialog-footer pb-0 pt-5 pr-0">
        <Button className="p-button-text" onClick={() => dialogVisibleVar(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
