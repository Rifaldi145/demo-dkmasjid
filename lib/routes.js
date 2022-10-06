// import
import Dashboard from "../pages/admin/dashboard/Dashboard.js";
import {
    Icon
} from "@chakra-ui/react";
import {
    FaHome,
    FaUserTie,
    FaUsers,
    FaMoneyCheck,
    FaMoneyBillWaveAlt,
    FaHandHolding,
    FaRegNewspaper,
    FaRegImage
} from "react-icons/fa";

var dashRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <Icon as={FaHome} color="inherit"/>,
    component: Dashboard,
    layout: "",
  },

];
export default dashRoutes;
