import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BILLS } from '../../graphql'
import { colors } from './chart-colors'
import { Chart } from 'primereact/chart'

export const BalanceChart = () => {
  const [creditLimitData, setCreditLimitData] = useState()
  const {
    data: billData,
    loading: billLoading,
    error: billError,
  } = useQuery(GET_BILLS, {
    fetchPolicy: 'cache-first',
    onCompleted: data => {
      const dataSet = data.bills.reduce(
        (acc, value) => {
          if (value.balance != '0') {
            acc.labels.push(value.name)
            acc.datasets[0].data.push(parseFloat(value.balance))
          }
          return acc
        },
        {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: colors.blues,
            },
          ],
        }
      )
      console.log('DataSet', dataSet)
      setCreditLimitData(dataSet)
    },
  })

  return <Chart type="pie" data={creditLimitData} style={{ position: 'relative', width: '40%' }} />
}
