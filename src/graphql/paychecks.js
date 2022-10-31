import { gql } from '@apollo/client'

export const GET_PAYCHECKS = gql`
  query GetPaychecks {
    paychecks {
      id
      employer
      cycleInDays
      pay
    }
  }
`

export const ADD_PAYCHECK = gql`
  mutation AddPaycheck($input: AddPaycheckInput) {
    addPaycheck(input: $input) {
      id
      employer
      cycleInDays
      pay
    }
  }
`
export const UPDATE_PAYCHECK = gql`
  mutation UpdatePaycheck($input: UpdatePaycheckInput) {
    updatePaycheck(input: $input) {
      id
      employer
      cycleInDays
      pay
    }
  }
`

export const DELETE_PAYCHECK = gql`
  mutation DeletePaycheck($deletePaycheckId: ID!) {
    deletePaycheck(id: $deletePaycheckId) {
      id
      employer
      cycleInDays
      pay
    }
  }
`
