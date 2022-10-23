import "./App.css"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { Header, Content } from "./components/layout"
import { getRoutes } from "./navigation/routes"

const router = createBrowserRouter(getRoutes())

function App() {
    return (
        <div className='app'>
            <Header />
            <Content>
                <RouterProvider router={router}></RouterProvider>
            </Content>
        </div>
    )
}

export default App
