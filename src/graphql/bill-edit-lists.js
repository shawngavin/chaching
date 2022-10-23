import { gql } from '@apollo/client'

export const GET_BILL_EDIT_LISTS = gql`
  query BillEditListsQuery {
    billEditLists {
      autoPayTypes
      billTypes
    }
  }
`
