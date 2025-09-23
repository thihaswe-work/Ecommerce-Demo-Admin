import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoute, PublicRoute } from "./components/RouteGuards";
import { SidebarProvider } from "./components/ui/sidebar";
import GlobalErrorHandler from "./components/GlobalErrorHandler";
import { useError } from "./context/errorContext";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import Loader from "./components/Loader";

// ✅ Lazy imports
const LoginPage = lazy(() => import("./pages/(auth)/login"));
const DashboardPage = lazy(() => import("./pages/(routes)/dashboard"));
const UsersPage = lazy(() => import("./pages/(routes)/users"));
const OrdersPage = lazy(() => import("./pages/(routes)/orders"));
const ProductsPage = lazy(() => import("./pages/(routes)/products"));
const OrderDetailPage = lazy(
  () => import("./pages/(routes)/orders/orderDetail")
);
const NotFound = lazy(() => import("./pages/(errors)/notfound"));

function App() {
  const { error } = useError();

  if (error) return <GlobalErrorHandler />;

  return (
    <Router>
      {/* Suspense fallback while lazy components load */}
      <Suspense fallback={<Loader />}>
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
            />
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
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
