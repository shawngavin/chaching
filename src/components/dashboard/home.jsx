import { CreditCardUsage, BalanceChart, NetPay } from './'

export const Home = () => {
  return (
    <>
      <h2>Welcome to Cha-Ching</h2>
      <h4>Your Total Money Management Solution</h4>
      <div className="grid">
        <div className="col-2">
          <CreditCardUsage />
        </div>
        <div className="col-6" style={{ height: 400 }}>
          <BalanceChart />
        </div>
        <div className="col-3">
          <NetPay />
        </div>
      </div>
    </>
  )
}
