import { useQuery } from '@apollo/client'
import { GET_PAYCHECKS } from '../../graphql/paychecks'

export const NetPay = () => {
  const { data } = useQuery(GET_PAYCHECKS)
  return (
    <div className="card">
      {data?.paychecks?.map((o, i) => (
        <div key={o.id}>
          {`${o.employer} - ${parseFloat(o.pay).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} - ${o.payPerYear}
            `}
        </div>
      ))}
    </div>
  )
}
