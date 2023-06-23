import { gql } from '@apollo/client'

export const GET_EMPLOYERS = gql`
  query Query {
    employers {
      id
      name
      paychecksPerYear
    }
  }
`

export const ADD_EMPLOYER = gql`
  mutation Mutation($input: AddEmployerInput!) {
    addEmployer(input: $input) {
      id
      name
      paychecksPerYear
    }
  }
`
export const UPDATE_EMPLOYER = gql`
  mutation Mutation($input: UpdateEmployerInput!) {
    updateEmployer(input: $input) {
      id
      name
      paychecksPerYear
    }
  }
`
