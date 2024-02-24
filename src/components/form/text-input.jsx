import { InputText } from 'primereact'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { ErrorIcon } from './'

export const TextInput = ({ name, rules, control, label, helperText }) => {
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
              <InputText
                id={field.name}
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
