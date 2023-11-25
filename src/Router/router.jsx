import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "../Providers/PrivateRoutes";
import Secret from "../Pages/Shared/Secret/Secret";
import DashBoard from "../Layout/Dashboard/AddItems/Dashboard/DashBoard";

import AllUsers from "../Layout/Dashboard/All Users/AllUsers";
import AddItems from "../Layout/Dashboard/AddItems/AddItems";
import AdminRoute from "../Providers/adminRoute";
import Cart from "../Layout/Dashboard/Cart/Cart";
import ManageItems from "../Layout/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Layout/Dashboard/updateItem/UpdateItem";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/AddItems/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Layout/Dashboard/UserHome/UserHome";
import AdminHome from "../Layout/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }, {
        path: '/menu',
        element: <Menu></Menu>
      }, {
        path: '/order/:category',
        element: <Order></Order>
      }, {
        path: '/login',
        element: <Login></Login>
      }, {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/secret',
        element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes> <DashBoard></DashBoard></PrivateRoutes>,
    children: [
      //normal user routes
      {

        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },

      // admin routes
      {
        path: 'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },

      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {

        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({ params }) => fetch(`https://bistro-boss-server-six-steel.vercel.app/menu/${params.id}`)
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }

    ]
  }
]);