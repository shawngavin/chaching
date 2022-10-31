import { useReactiveVar } from '@apollo/client'
import { selectedVar } from '../../local-store'

export const BillDisplay = () => {
  const selected = useReactiveVar(selectedVar)
  console.log('BillDisplay', selected)
  return (
    <div style={{ padding: 15 }}>
      <h3>{selected?.name}</h3>
    </div>
  )
}
