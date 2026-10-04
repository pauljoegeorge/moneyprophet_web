import Settings from "./index";

const SettingsRoutes = [
  {
    component: Settings,
    path: "/settings",
    exact: true,
    type: "private",
  },
];

export default SettingsRoutes;
