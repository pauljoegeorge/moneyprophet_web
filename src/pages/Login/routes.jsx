import Login from "./index";

const LoginRoutes = [
  {
    component: Login,
    path: "/sign_in",
    exact: true,
    type: "public",
  },
];

export default LoginRoutes;
