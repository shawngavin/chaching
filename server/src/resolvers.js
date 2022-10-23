import { v4 as uuid } from "uuid"
import { Biller, User, Bill, BillType, AutoPayType } from "./db.js"

export const resolvers = {
    Query: {
        billers: () => Biller.findAll(),
        bills: () => Bill.findAll(),
        billTypes: () => BillType.findAll(),
        autoPayTypes: () => AutoPayType.findAll(),
        billEditLists: () => ({
            autoPayTypes: AutoPayType.findAll(),
            billTypes: BillType.findAll(),
        }),
    },
    Mutation: {
        addBiller: (_, { input }) => {
            const newBiller = { ...input, id: uuid() }
            Biller.create(newBiller)
            return newBiller
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
        updateBiller: async (_, { input }) => {
            return await Bill.update(input)
        },
        deleteBill: async (_, { id }) => {
            const bill = await Bill.findById(id)
            await Bill.delete(id)
            return bill
        },
    },
    Bill: {
        biller: parent => {
            return Biller.findById(parent.billerId)
        },
    },
}
