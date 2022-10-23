import { gql } from "@apollo/client"

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
