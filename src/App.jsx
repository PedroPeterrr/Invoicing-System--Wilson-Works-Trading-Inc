
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy  } from "react";
import LoadingBar from "./components/Reusable/LoadingBar";

const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingBar />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;