
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy  } from "react";
import LoadingBar from "./components/Reusable/LoadingBar";
import useAuthStore from "./store/useAuthStore";

const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Home = lazy(() => import("./pages/Home"));
const InvoiceListPage = lazy(() => import("./pages/invoice/InvoiceListPage"));
const InvoiceFormPage = lazy(() => import("./pages/invoice/InvoiceFormPage"));

function PrivateRoute({ children }) {
  const user = useAuthStore(state => state.user);
  return user
    ? children
    : <Navigate to="/login"/>;
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingBar />}>
        <Routes>
          {/* public */}
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private */}
          <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
          />
          <Route
            path="/invoices"  
            element={
              <PrivateRoute>
                <InvoiceListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices/:id"  
            element={
              <PrivateRoute>
                <InvoiceFormPage />
              </PrivateRoute>
            }
          />
        
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}