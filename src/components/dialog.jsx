import { useReactiveVar } from '@apollo/client'
import { dialogVisibleVar } from '../local-store'
import { Button, Dialog as PrimeDialog } from 'primereact'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export const Dialog = ({ children, title }) => {
  const visible = useReactiveVar(dialogVisibleVar)
  useEffect(() => {
    if (visible) {
      confetti()
    }
  }, [visible])
  return (
    <PrimeDialog visible={visible} onHide={() => dialogVisibleVar(false)} header={<h3>{title}</h3>} style={{ minWidth: '50%' }}>
      {children}
    </PrimeDialog>
  )
}
