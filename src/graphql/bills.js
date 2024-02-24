import { gql } from '@apollo/client'

export const GET_BILLS = gql`
  query GetBillsQuery {
    bills {
      id
      name
      balance {
        amount
        date
      }
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      biller {
        id
        name
        image
        website
      }
      billType
      updated
      website
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
      updated
      website
    }
  }
`

export const ADD_BILL = gql`
  mutation AddBill($input: AddBillInput) {
    addBill(input: $input) {
      id
      name
      balance {
        amount
      }
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      biller {
        id
        name
        website
      }
      billType
      website
    }
  }
`
export const UPDATE_BILL = gql`
  mutation UpdateBill($input: UpdateBillInput) {
    updateBill(input: $input) {
      id
      name
      minimumDue
      dueDay
      creditLimit
      userId
      autoPay
      autoPayType
      accountNumber
      biller {
        id
        name
        website
      }
      billType
      website
    }
  }
`
