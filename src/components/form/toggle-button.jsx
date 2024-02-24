import { ToggleButton as PrimeToggleButton } from 'primereact'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { ErrorIcon } from './error-icon'

export const ToggleButton = ({ name, rules, control, label, helperText }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className="field">
            <label htmlFor={field.name} className="block">
              {label}
            </label>
            <ErrorIcon fieldState={fieldState}>
              <PrimeToggleButton
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                id={field.name}
                checked={field.value}
                //onChange={e => (field.value = e.value)}
                {...field}
                className={classNames({
                  'p-invalid': fieldState.invalid,
                })}
              />
            </ErrorIcon>

            {helperText && (
              <small id="username1-help" className="">
                {helperText}
              </small>
            )}
          </div>
        )
      }}
    />
  )
}
