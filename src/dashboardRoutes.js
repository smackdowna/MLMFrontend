import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/common/Loader";
import Home from "./components/dashboard/Home";

const MyNetwork = lazy(() => import("./components/dashboard/MyNetwork"));
const MyIncome = lazy(() => import("./components/dashboard/MyIncome"));
const Wallet = lazy(() => import("./components/dashboard/Wallet"));
const Transaction = lazy(() => import("./components/dashboard/Transaction"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const PendingRequest = lazy(() => import("./components/dashboard/PendingRequest"));
const RaiseTicket = lazy(() => import("./components/dashboard/RaiseTicket"));
const ProductPage = lazy(() => import("./components/dashboard/ProductPage"));
const PendingQueries = lazy(() => import("./components/dashboard/PendingQueries"));

const AdminDashboardRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AdminDashboard />}>
          <Route index element={<Home />} />
          <Route path="network" element={<MyNetwork />} />
          <Route path="income" element={<MyIncome />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="pending/requests" element={<PendingRequest />} />
          <Route path="pending/queries" element={<PendingQueries />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const UserDashboardRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<UserDashboard />}>
          <Route index element={<Home />} />
          <Route path="network" element={<MyNetwork />} />
          <Route path="income" element={<MyIncome />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="raiseticket" element={<RaiseTicket />} />
          <Route path="buyproduct" element={<ProductPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { AdminDashboardRoutes, UserDashboardRoutes };
