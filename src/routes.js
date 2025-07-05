import { Navigate, useRoutes } from "react-router-dom";
import PublicRoutesLayout from "./Layouts/PublicRoutesLayout";
import DashboardLayout from './Layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Users from "./pages/AppUser/AppUsers";
import FindAccount from "./pages/FindYourAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import ERequests from "./pages/EService/ERequests";
import Categories from "./pages/Categories/Category";
import SubCategory from "./pages/SubCategories/SubCategory";
import ChatPage from "./pages/Chat/ChatPage";
import ClientsVisitors from "./pages/Visitors/ClientsVisitors";

// Authentication (If Login or Not)
const Auth = () => {
  const token = localStorage.getItem("wasl_token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default function Router() {


  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      // Protected Routes
      ...(Auth() && {
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "requests", element: <ERequests /> },
          { path: "category", element: <Categories /> },
          { path: "subcategory", element: <SubCategory /> },
          { path: "chat", element: <ChatPage /> },
          { path: "client/visitors", element: <ClientsVisitors /> },
        ],
      }),
      // Redirect to login if not authenticated
      ...(!Auth() && { children: <Navigate to="/login" replace={true} /> }),
    },
    {
      path: "/login",
      element: <PublicRoutesLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "default", element: <Register /> },
        { path: "page404", element: <Page404 /> },
        { path: "login/identify", element: <FindAccount /> },
        { path: "reset/password", element: <ForgotPassword /> },
      ],
    },
    // Redirect to login if path is not found
    { path: "*", element: <Navigate to="/login" replace={true} /> },
  ]);
}
