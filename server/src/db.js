import { Database } from 'fakebase'

const database = new Database('./data')

export const Biller = database.table('billers')
export const User = database.table('users')
export const Bill = database.table('bills')
export const BillType = database.table('bill-types')
export const AutoPayType = database.table('auto-pay-types')
export const Pay = database.table('paychecks')
export const Employer = database.table('employers')
export const Balances = database.table('balances')
