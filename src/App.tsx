import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/RouteGuards";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import UsersPage from "./pages/users";
import OrdersPage from "./pages/orders";
import ProductsPage from "./pages/products";
import { SidebarProvider } from "./components/ui/sidebar";
import OrderDetailPage from "./pages/orders/orderDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route
            path="login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          ></Route>
        </Route>

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <SidebarProvider>
                <AuthLayout />
              </SidebarProvider>
            }
          >
            <Route path="" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            {/* <Route path="payments" element={<PaymentsPage />} /> */}
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
