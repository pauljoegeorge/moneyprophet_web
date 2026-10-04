import Transactions from "./index";
import AutoTransaction from "./AutoTransaction";
import AutoVisionTransaction from "./AutoVisionTransaction";

const TransactionsRoutes = [
  {
    component: Transactions,
    path: "/new",
    exact: true,
    type: "private",
  },
  {
    component: AutoTransaction,
    path: "/chat",
    exact: true,
    type: "private",
  },
  {
    component: AutoVisionTransaction,
    path: "/new/bill",
    exact: true,
    type: "private",
  },
];

export default TransactionsRoutes;
