import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import { useCallback, useEffect } from "react";

// Import layouts
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getUser } from "./redux/slices/authSlice";
import { getDocumentsData } from "./api/docs";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((state: any) => state); // Save state to storage
  return <>{isLoggedIn ? <Outlet /> : <Navigate to={"/"} />}</>;
};
const RestrictedRoutes = () => {
  const { isLoggedIn } = useSelector((state: any) => state);
  return <>{!isLoggedIn ? <Outlet /> : <Navigate to={"/dashboard"} />}</>;
};

function App() {
  const dispatch = useDispatch<any>();
  const initApp = useCallback(async () => { // Move to the dashboard
    await dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
