import Error from "./index";

const ErrorRoutes = [
  {
    component: Error,
    path: "*",
    exact: true,
    type: "bare",
  },
];

export default ErrorRoutes;
