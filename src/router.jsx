import { createBrowserRouter } from "react-router-dom"
import Estoque from "./pages/Estoque"
import Dashboard from "./pages/Dashboard"
import RootLayout from "./pages/RootLayout"
import ViewProduct from "./pages/ViewProduct"
import UpdateProduct from "./pages/UpdateProduct"
import NewProduct from "./pages/NewProduct"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "estoque",
                element: <Estoque />
            },
            {
                path: "novo-item",
                element: <NewProduct />
            },
            {
                path: "view/:id",
                element: <ViewProduct />
            },
            {
                path: "update/:id",
                element: <UpdateProduct />
            }
        ]
    },
])

export default router
