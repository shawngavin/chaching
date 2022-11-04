import { v4 as uuid } from 'uuid'
import { Biller, User, Bill, BillType, AutoPayType, Pay } from './db.js'

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
  },
  Mutation: {
    addBiller: (_, { input }) => {
      const newBiller = { ...input, id: uuid() }
      Biller.create(newBiller)
      return newBiller
    },
    updateBill: async (_, { input }) => {
      return await Bill.update(input)
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
      const newBill = { ...input, id: uuid() }
      Bill.create(newBill)
      return newBill
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
  },
  Bill: {
    biller: parent => {
      return Biller.findById(parent.billerId)
    },
  },
}
