import Dashboard from "./index";

const DashboardRoutes = [
  {
    component: Dashboard,
    path: "/dashboard",
    exact: true,
    type: "private",
  },
];

export default DashboardRoutes;
