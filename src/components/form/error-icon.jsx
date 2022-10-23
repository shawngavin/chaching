export const ErrorIcon = ({ children, fieldState }) => {
  if (fieldState?.invalid) {
    return (
      <span className="p-input-icon-right">
        <i className="pi pi-exclamation-triangle text-orange-600" />
        {children}
      </span>
    )
  } else return children
}
