import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import "primereact/resources/themes/mdc-light-deeppurple/theme.css" //icons

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
