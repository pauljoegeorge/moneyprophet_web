import React from "react";
import { Route, Redirect } from "react-router-dom";
import Landing from "./marketing/Landing";
import ErrorRoutes from "./pages/Error/route";
import LoginRoutes from "./pages/Login/routes";
import DashboardRoutes from "./pages/Dashboard/routes";
import FixedExpensesRoutes from "./pages/FixedExpenses/routes";
import UnexpectedExpensesRoutes from "./pages/UnexpectedExpenses/routes";
import IncomeRoutes from "./pages/Income/routes";
import ExpenseCategoriesRoutes from "./pages/ExpenseCategories/routes";
import Expenses from "./pages/Expenses/routes";
import RecurrentExpensesRoutes from "./pages/RecurrentExpenses/routes";
import TransactionsRoutes from "./pages/Transaction/routes";
import MapRoutes from "./pages/Map/routes";
import SettingsRoutes from "./pages/Settings/routes";
import ForecastsRoutes from "./pages/Forecasts/routes";
import LayoutContainer from "./containers/Layout";
import AppLayout from "./containers/Layout/AppLayout";
import { getAuthToken } from "./utils/auth";

const routes = [
  ...LoginRoutes.map((route) => ({ ...route, type: "bare" })),
  ...DashboardRoutes,
  ...FixedExpensesRoutes,
  ...UnexpectedExpensesRoutes,
  ...IncomeRoutes,
  ...ExpenseCategoriesRoutes,
  ...TransactionsRoutes,
  ...Expenses,
  ...RecurrentExpensesRoutes,
  ...MapRoutes,
  ...SettingsRoutes,

  ...ForecastsRoutes,
  ...ErrorRoutes,
];

const renderRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => (
      <LayoutContainer {...props}>
        <route.component {...restProps} {...props} />
      </LayoutContainer>
    )}
  />
);

const renderBareRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => <route.component {...restProps} {...props} />}
  />
);

const renderPrivateRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => {
      const authenticated = getAuthToken();
      if (authenticated)
        return (
          <AppLayout {...props}>
            <route.component {...restProps} {...props} />
          </AppLayout>
        );
      return <Redirect to={{ pathname: "/sign_in" }} />;
    }}
  />
);

export const routeGenerator = ({ ...props }) => [
  <Route key="root" path="/" exact render={() => <Landing />} />,
  ...routes.map((route) => {
    if (route.type === "bare") return renderBareRoute(route, { ...props });
    if (route.type === "public") return renderRoute(route, { ...props });
    return renderPrivateRoute(route, { ...props });
  }),
];
