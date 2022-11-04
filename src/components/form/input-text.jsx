import { InputText } from 'primereact/inputtext'

export const TextInput = ({ name, label, control }) => {
  return (
    <div className="p-fluid field">
      <label htmlFor={name}>{label}</label>
      <InputText id={`textInput-${name}`} name={name} onChange={control.handleChange} value={control.values[name]} />
    </div>
  )
}
