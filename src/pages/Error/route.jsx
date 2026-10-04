import Error from "./index";

const ErrorRoutes = [
  {
    component: Error,
    path: "*",
    exact: true,
    type: "public",
  },
];

export default ErrorRoutes;
