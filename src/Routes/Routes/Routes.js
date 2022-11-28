import AddSell from "../../components/Dashboard/AddSell/AddSell";
import AllBuyer from "../../components/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../components/Dashboard/AllSeller/AllSeller";
import Allusers from "../../components/Dashboard/AllUsers/Allusers";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyProducts from "../../components/Dashboard/MyProducts/MyProducts";
import MyWishList from "../../components/Dashboard/MyWishList/MyWishList";
import Payment from "../../components/Dashboard/Payment/Payment";
import ReportedItem from "../../components/Dashboard/ReportedItem/ReportedItem";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import DashboardLayout from "../../Layout/DashboardLayout";
import About from "../../Pages/About/About";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Home/CategoryCards/Categories";
import RouteNotFound from "../../Pages/RouteNotFound/RouteNotFound";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import BuyerRoutes from "../BuyerRoutes/BuyerRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import SellerRoutes from "../SellerRoutes/SellerRoutes";

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
                path: '/about',
                element: <About></About>
            },
            {
                path: '/categoryBooks/:name',
                element: <PrivateRoutes><Categories></Categories></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://sadika-assignment12-server.vercel.app/books/${params.name}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/allusers',
                element: <AdminRoutes><Allusers></Allusers></AdminRoutes>
            },
            {
                path: '/dashboard/reportedItem',
                element: <AdminRoutes><ReportedItem></ReportedItem></AdminRoutes>,
                //loader: fetch('https://sadika-assignment12-server.vercel.app/reportItems')
            },
            {
                path: '/dashboard/addsell',
                element: <SellerRoutes><AddSell></AddSell></SellerRoutes>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoutes><MyProducts></MyProducts></SellerRoutes>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoutes><AllBuyer></AllBuyer></AdminRoutes>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoutes><AllSeller></AllSeller></AdminRoutes>
            },
            {
                path: '/dashboard/wishList',
                element: <BuyerRoutes><MyWishList></MyWishList></BuyerRoutes>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://sadika-assignment12-server.vercel.app/bookingItems/${params.id}`)
            }
        ]
    },
    {
        path: '/*',
        element: <RouteNotFound></RouteNotFound>
    }

]);
export default router;