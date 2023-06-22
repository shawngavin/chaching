import { gql } from '@apollo/client'

export const GET_BILLERS = gql`
  query GetBillersQuery {
    billers {
      id
      name
      website
      image
    }
  }
`
export const ADD_BILLER = gql`
  mutation AddBillerMutation($input: AddBillerInput!) {
    addBiller(input: $input) {
      id
      name
      website
      image
    }
  }
`

export const UPDATE_BILLER = gql`
  mutation UpdateBillerMutation($input: BillerUpdateInput) {
    updateBiller(input: $input) {
      id
      name
      website
      image
    }
  }
`

export const DELETE_BILLER = gql`
  mutation DeleteBillerMutation($deleteBillerId: ID!) {
    deleteBiller(id: $deleteBillerId) {
      id
      name
      website
      image
    }
  }
`
