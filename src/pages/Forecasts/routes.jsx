import Forecasts from "./index";

const ForecastsRoutes = [
  {
    component: Forecasts,
    path: "/forecasts",
    exact: true,
    type: "private",
  },
];

export default ForecastsRoutes;
