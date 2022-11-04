export const typePolicies = {
  Paycheck: {
    fields: {
      payPerYear: {
        read(_, { variables }) {
          return 'test'
        },
      },
    },
  },
}
