import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BILLS_OF_TYPE } from '../../graphql'
import { currencyTemplate } from '../common'

export const CreditCardUsage = () => {
  const [dataset, setDataset] = useState()
  const {
    data: billData,
    loading: billLoading,
    error: billError,
  } = useQuery(GET_BILLS_OF_TYPE, {
    variables: { billType: 'Credit Card' },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      console.log('query', data)
      const result = data.billsOfType.reduce(
        (acc, cur) => {
          if (cur.balance != '0') {
            acc.totalBalances += parseFloat(cur.balance)
          }
          acc.totalCreditLimit += parseFloat(cur.creditLimit)
          return acc
        },
        {
          totalCreditLimit: 0,
          totalBalances: 0,
        }
      )
      console.log('result', result)
      setDataset(result)
    },
  })

  console.log(dataset)
  return (
    <div className="p-card" style={{ padding: 15 }}>
      <h4>Credit Card Usage ({(dataset?.totalBalances / dataset?.totalCreditLimit).toLocaleString('en-US', { style: 'percent' })})</h4>
      <div>
        <strong>Total Balances:</strong> {dataset?.totalBalances?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
      <div>
        <strong>Total Credit Limit:</strong> {dataset?.totalCreditLimit?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
    </div>
  )
}
