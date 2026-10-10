import Transactions from "./index";
import AutoTransaction from "./AutoTransaction";

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
];

export default TransactionsRoutes;
