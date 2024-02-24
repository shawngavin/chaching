import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { typePolicies } from './type-policies'

import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css' //icons
import { readJsonBody } from '@apollo/client/link/http/parseAndCheckHttpResponse'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Paycheck: {
        fields: {
          payPerYear: {
            read(_, { readField }) {
              const paycheck = parseFloat(readField('pay'))
              const cycleInDays = parseInt(readField('cycleInDays'))
              return `${(paycheck * (365 / cycleInDays)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
            },
          },
        },
      },
    },
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
