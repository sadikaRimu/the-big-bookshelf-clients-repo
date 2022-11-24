import AddSell from "../../components/Dashboard/AddSell/AddSell";
import Allusers from "../../components/Dashboard/AllUsers/Allusers";
import Dashboard from "../../components/Dashboard/Dashboard";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import DashboardLayout from "../../Layout/DashboardLayout";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard/allusers',
                element: <Allusers></Allusers>
            },
            {
                path: '/dashboard/addsell',
                element: <AddSell></AddSell>
            }
        ]
    }

]);
export default router;