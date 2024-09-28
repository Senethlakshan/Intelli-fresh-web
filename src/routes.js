import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

import MultiDayTour from "views/tg_admin/multiday-tour/MultiDayDetails";
import OneDayTour from "views/tg_admin/oneday-tour/OneDayTour";
import Payment from "views/tg_admin/payment-details/Payment";
import TingsTODO from "views/tg_admin/tings-todo/TingsTODO";
import Transfers from "views/tg_admin/transfers/Transfers";
import UserDetails from "views/tg_admin/users-details/UserDetails";
import BlogDetails from "views/tg_admin/blog-details/BlogDetails";
import Mice from "views/tg_admin/mice/Mice";
import AllUser from "views/tg_admin/users-details/AllUsers";
import AdminConfig from "views/tg_admin/adminConfig/AdminConfig";
import TourTab from "views/tg_admin/TourTabInfo/TourTab";

// Auth Imports
import SignIn from "views/auth/SignIn";

//farmer imports
import FarmerDashbord from "views/farmer/FarmerDashbord";

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdLock,
  MdCallMade, 
  MdPayment,
  MdOutlineGroups,
  MdOutlineDashboardCustomize, 
  MdPeople, 
  MdSettings 
} from "react-icons/md";



const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  }
  ,
  {
    name: "User-Details",
    layout: "/admin",
    icon: <MdOutlineGroups  className="h-6 w-6" />,
    path: "UserDetails",
    component: <UserDetails/>,
  },
  {
    name: "Blog Details",
    layout: "/admin",
    path: "Blog-Details",
    icon: <MdOutlineDashboardCustomize className="h-6 w-6" />,
    component: <BlogDetails />,
    secondary: true,
  },
  {
    name: "Tour Package Management",
    layout: "/admin",
    path: "tour-info",
    icon: <MdOutlineDashboardCustomize className="h-6 w-6" />,
    component: <TourTab/>,
    secondary: true,
  },
  {
    name: "Multiday-tour",
    layout: "/admin",
    path: "multiday-tour",
    icon: <MdCallMade  className="h-6 w-6" />,
    component: <MultiDayTour />,
    secondary: true,
  },
  {
    name: "OneDay-tour",
    layout: "/admin",
    icon: <MdCallMade  className="h-6 w-6" />,
    path: "OneDay-tour",
    component: <OneDayTour/>,
  },
  {
    name: "Mice",
    layout: "/admin",
    path: "mice-details",
    icon: <MdCallMade className="h-6 w-6" />,
    component: <Mice />,
  },
  {
    name: "TingsTODO",
    layout: "/admin",
    path: "things-todo",
    icon: <MdCallMade  className="h-6 w-6" />,
    component: <TingsTODO />,
    secondary: true,
  },
  {
    name: "Transfers",
    layout: "/admin",
    icon: <MdCallMade  className="h-6 w-6" />,
    path: "transfers",
    component: <Transfers/>,
  },
  {
    name: "Payment",
    layout: "/admin",
    path: "Payment-details",
    icon: <MdPayment className="h-6 w-6" />,
    component: <Payment />,
  },
  {
    name: "Configuration",
    layout: "/admin",
    path: "AdminConfig",
    icon: <MdSettings className="h-6 w-6" />,
    component: <AdminConfig />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  }
  
];
export default routes;
