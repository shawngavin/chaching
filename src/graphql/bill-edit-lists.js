import { gql } from '@apollo/client'

export const GET_BILL_EDIT_LISTS = gql`
  query BillEditLists {
    billEditLists {
      autoPayTypes
      billTypes
      billers {
        id
        name
      }
    }
  }
`
