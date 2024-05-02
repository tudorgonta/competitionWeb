import Cookies from "js-cookie";
import 
    React, 
    { 
        Suspense, 
        useEffect, 
        useState 
} from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// Api
import { verifyToken } from "../api/user/auth/verifyToken";

// Components
import Layout from "../components/layout";
import Home from "../pages/Home";
import LogOut from "../pages/Logout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordReset from "../pages/PasswordReset";
import Profile from "../pages/Profile";
import SingleComp from "../pages/SingleComp";
import Winners from "../pages/Winners";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Terms from "../pages/Terms";
import Contact from "../pages/Contact";
import Success from "../pages/Success";
import Error404 from "../pages/Error404";

// Middleware to verify token and check auth
const checkAuth = (Component) => {
    const AuthenticatedComponent = (props) => {

      const navigate = useNavigate();
  
      // Clear user data
      const clearUser = async () => {
        Cookies.remove("accessToken");
        localStorage.removeItem("user");
      };
      
      // Verify user token
      const verifyUser = async () => {
        try {
          const res = await verifyToken();
          if (!res?.data) {
            clearUser();
            navigate("/login");
          } else {
            Cookies.set("accessToken", res.data)
          }
        } catch {
          clearUser();
          navigate("/");
          window.location.reload();
        }
      };

      // Check if user is logged in
      useEffect(() => {
        // Get Token and to check if loggedIn
        const token = Cookies.get("accessToken");
        if (token) {
          verifyUser();
        } else {
          clearUser();
        }
      }, []);

      // Return component
      return <Component {...props} />;
    };
    // Return component
    return AuthenticatedComponent;
};

const CheckAuthHome = checkAuth(Home);
const CheckAuthLogout = checkAuth(LogOut);
const CheckAuthLogin = checkAuth(Login);
const CheckAuthRegister = checkAuth(Register);
const CheckAuthPasswordReset = checkAuth(PasswordReset);
const CheckAuthProfile = checkAuth(Profile);
const CheckAuthSingleComp = checkAuth(SingleComp);
const CheckAuthWinners = checkAuth(Winners)
const CheckAuthSearch = checkAuth(Search);
const CheckAuthCart = checkAuth(Cart);
const CheckAuthTerms = checkAuth(Terms);
const CheckAuthContact = checkAuth(Contact);
const CheckAuthSuccess = checkAuth(Success);
const CheckAuthErorr404 = checkAuth(Error404);


export const AppRouter = () => {
    const ROUTS = [
      {
        path: "/",
        element: <CheckAuthHome />,
        exact: true,
      }, // Home page
      {
        path: "/logout",
        element: <CheckAuthLogout />,
        exact: true,
      }, // Logout page
      {
        path: "/login",
        element: <CheckAuthLogin />,
        exact: true,
      }, // Login page
      {
        path: "/register",
        element: <CheckAuthRegister />,
        exact: true,
      }, // Register page
      {
        path: "/reset-password",
        element: <CheckAuthPasswordReset />,
        exact: true,
      }, // Password reset page
      {
        path: "/profile/:userId",
        element: <CheckAuthProfile />,
        exact: true,
      }, // Profile Page
      {
        path: "/comp/:compId",
        element: <CheckAuthSingleComp />,
        exact: true,
      }, // Single competition page
      {
        path: "/winners",
        element: <CheckAuthWinners />,
        exact: true, // Winners page
      },
      {
        path: "/search",
        element: <CheckAuthSearch />,
        exact: true,
      }, // Search page
      {
        path: "/cart",
        element: <CheckAuthCart />,
        exact: true,
      }, // Cart page
      {
        path: "/terms",
        element: <CheckAuthTerms />,
        exact: true,
      }, // Terms & Conditions Page
      {
        path: "/contact",
        element: <CheckAuthContact />,
        exact: true,
      }, // Terms & Conditions Page
      {
        path: "/success",
        element: <CheckAuthSuccess />,
        exact: true,
      }, // Payment success page
      {
        path: "/404",
        element: <CheckAuthErorr404 />,
        exact: true,
      }, // 404 Page
      {
        path: "*",
        element: <Navigate to="/404" replace />,
        replace: true,
      }, // Error handler
    ];
  
    const [loading, setLoading] = useState(false);
  
    const routes = (
      <Suspense>
        <Routes onStart={() => setLoading(true)} onEnd={() => setLoading(false)}>
          {ROUTS.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              exact={route.exact}
              replace={route.replace}
            />
          ))}
        </Routes>
      </Suspense>
    );
  
    return (
      <Router>
        <Layout loading={loading}>{routes}</Layout>
      </Router>
    );
  };
  
