import { v4 as uuid } from 'uuid'
import { Biller, User, Bill, BillType, AutoPayType, Pay, Employer, Balances } from './db.js'

const getLatestBalance = async id => {
  const balances = await Balances.findAll(p => p.id === id)
  const sortedBalances = balances.sort((a, b) => new Date(b.date) - new Date(a.date))
  const mostRecentBalance = sortedBalances[0] ?? { amount: null, date: null }
  return mostRecentBalance
}

export const resolvers = {
  Query: {
    bills: () => Bill.findAll(),
    billsOfType: async (_, { billType }) => {
      const billsOfType = await Bill.findAll()
      return billsOfType.filter(f => f.billType === billType)
    },
    billTypes: () => BillType.findAll(),
    autoPayTypes: () => AutoPayType.findAll(),
    billEditLists: () => ({
      autoPayTypes: AutoPayType.findAll(),
      billTypes: BillType.findAll(),
      billers: Biller.findAll(),
    }),
    billers: () => Biller.findAll(),
    paychecks: () => Pay.findAll(),
    employers: () => Employer.findAll(),
  },
  Mutation: {
    addBiller: (_, { input }) => {
      const newBiller = { ...input, id: uuid() }
      Biller.create(newBiller)
      return newBiller
    },
    updateBill: async (_, { input }) => {
      console.log('input', input)
      try {
        const { balance, biller, ...bill } = input
        const date = new Date().toISOString()

        // Biller
        const billerCheck = await Biller.findById(biller?.id)
        if (!billerCheck) {
          await Biller.create(biller)
        }

        const balanceCheck = await getLatestBalance(bill.id)
        const updatedBill = await Bill.update({ ...bill, billerId: biller.id, updated: date })
        console.log('updatedBill', updatedBill)
        if (!balanceCheck) {
          await Balances.create({ id: bill.id, date: date, amount: parseFloat(balance?.amount ?? '0') })
        } else if (balanceCheck?.amount !== parseFloat(balance.amount)) {
          await Balances.create({ id: bill.id, date: date, amount: parseFloat(balance.amount ?? '0') })
        }
        updatedBill.balance = { date: date, amount: balance.amount }
        return updatedBill
      } catch (Error) {
        console.log(Error)
      }
    },
    updateBiller: async (_, { input }) => {
      return await Biller.update(input)
    },
    deleteBiller: async (_, { id }) => {
      const biller = await Biller.findById(id)
      await Biller.delete(id)
      return biller
    },
    addBill: (_, { input }) => {
      const { balance, biller, ...bill } = input
      const id = uuid()
      const newBill = { ...input, id, billerId: biller?.id, updated: new Date().toISOString() }
      Bill.create(newBill)
      const newBalance = { id, date: new Date().toISOString(), amount: parseFloat(balance?.amount ?? '0') }
      Balances.create(newBalance)
      newBill.balance = newBalance
      newBill.biller = biller
      const { billerID, ...result } = newBill
      return result
    },
    deleteBill: async (_, { id }) => {
      const bill = await Bill.findById(id)
      await Bill.delete(id)
      return bill
    },
    addPaycheck: async (_, { input }) => {
      const newPaycheck = { ...input, id: uuid() }
      await Pay.create(newPaycheck)
      return newPaycheck
    },
    updatePaycheck: async (_, { input }) => {
      return await Pay.update(input)
    },
    deletePaycheck: async (_, { id }) => {
      const paycheck = Pay.findById(id)
      await Pay.delete(id)
      return paycheck
    },
    addEmployer: async (_, { input }) => {
      const newEmployer = { ...input, id: uuid() }
      await Employer.create(newEmployer)
      return newEmployer
    },
    updateEmployer: async (_, { input }) => {
      return await Employer.update(input)
    },
    deleteEmployer: async (_, { id }) => {
      const employer = Pay.findById(id)
      await Employer.delete(id)
      return employer
    },
  },
  Bill: {
    biller: parent => {
      return Biller.findById(parent.billerId)
    },
    balance: async parent => getLatestBalance(parent.id),
  },
}
