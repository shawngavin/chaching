import { Database } from "fakebase"

const database = new Database("./data")

export const Biller = database.table("billers")
export const User = database.table("users")
export const Bill = database.table("bills")
export const BillType = database.table("bill-types")
export const AutoPayType = database.table("auto-pay-types")
