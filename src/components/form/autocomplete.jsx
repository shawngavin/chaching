import { AutoComplete as PrimeAutoComplete } from 'primereact'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { ErrorIcon } from './'

export const AutoComplete = ({ name, rules, control, label, helperText, suggestions, completeMethod, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className="field">
            <label htmlFor="username1" className="block">
              {label}
            </label>
            <ErrorIcon fieldState={fieldState}>
              <PrimeAutoComplete
                id={field.name}
                suggestions={suggestions}
                completeMethod={completeMethod}
                {...field}
                {...rest}
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
