import { Routes, Route } from "react-router-dom";
import { CartPage, HomePage, Login, ProductsList, Register, ProductDetail, OrderPage, DashboardPage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        {/* Protect the CartPage route:
          - If the user is logged in, allow access to /cart
          - If not logged in, redirect the user to /login */}
        <Route path="cart" element={
                                      <ProtectedRoute>
                                          <CartPage/>
                                      </ProtectedRoute>
                                    } />
        <Route path="order-summary" element={
                                      <ProtectedRoute>
                                          <OrderPage/>
                                      </ProtectedRoute>
                                    } />
        <Route path="dashboard" element={
                                      <ProtectedRoute>
                                          <DashboardPage/>
                                      </ProtectedRoute>
                                    } />
    </Routes>
    </>
  )
}
