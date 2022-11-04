import { gql } from '@apollo/client'

export const GET_BILLS = gql`
  query GetBillsQuery {
    bills {
      id
      name
      balance
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      biller {
        name
        website
      }
      billType
    }
  }
`

export const GET_BILLS_OF_TYPE = gql`
  query GetBillsOfType($billType: String!) {
    billsOfType(billType: $billType) {
      id
      name
      balance
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      billerId
      biller {
        id
        name
        website
      }
      billType
    }
  }
`

export const ADD_BILL = gql`
  mutation AddBill($input: AddBillInput) {
    addBill(input: $input) {
      id
      name
      balance
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      billerId
      biller {
        id
        name
        website
      }
      billType
    }
  }
`
export const UPDATE_BILL = gql`
  mutation UpdateBill($input: UpdateBillInput) {
    updateBill(input: $input) {
      id
      name
      balance
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      billerId
      biller {
        id
        name
        website
      }
      billType
    }
  }
`
