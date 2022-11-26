import AddSell from "../../components/Dashboard/AddSell/AddSell";
import AllBuyer from "../../components/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../components/Dashboard/AllSeller/AllSeller";
import Allusers from "../../components/Dashboard/AllUsers/Allusers";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyProducts from "../../components/Dashboard/MyProducts/MyProducts";
import MyWishList from "../../components/Dashboard/MyWishList/MyWishList";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Home/CategoryCards/Categories";
import RouteNotFound from "../../Pages/RouteNotFound/RouteNotFound";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

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
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/categoryBooks/:name',
                element: <PrivateRoutes><Categories></Categories></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/books/${params.name}`)
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
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/wishList',
                element: <MyWishList></MyWishList>
            }
        ]
    },
    {
        path: '/*',
        element: <RouteNotFound></RouteNotFound>
    }

]);
export default router;