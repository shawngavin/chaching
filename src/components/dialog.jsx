import { useReactiveVar } from '@apollo/client'
import { dialogVisibleVar, errorDialogVisibleVar } from '../local-store'
import { Button, Dialog as PrimeDialog } from 'primereact'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const smallCheckers = 'https://www.transparenttextures.com/patterns/checkered-light-emboss.png'

export const ErrorDialog = ({ errors }) => {
  const visible = useReactiveVar(dialogVisibleVar)
  const errorVisible = useReactiveVar(errorDialogVisibleVar)
  useEffect(() => {
    if (errorVisible) {
      confetti()
    }
  }, [errorVisible])
  return (
    <PrimeDialog visible={errorVisible} onHide={() => dialogVisibleVar(false)} header="Error" style={{ width: '50%' }}>
      <div className="p-card  text-center surface-600 bg-purple-50" style={{ padding: 25, backgroundImage: `url(${smallCheckers})` }}>
        <h3>{errors?.message}</h3>
      </div>
    </PrimeDialog>
  )
}

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
