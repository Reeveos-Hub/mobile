import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { MobileFrame } from "./components/MobileFrame";
import { AppShell } from "./components/AppShell";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Dashboard } from "./pages/Dashboard";
import { CalendarView } from "./pages/CalendarView";
import { AIHub } from "./pages/AIHub";
import { Menu } from "./pages/Menu";
import { ClientsScreen } from "./components/ClientsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { ShopScreen } from "./components/ShopScreen";
import { ServicesScreen } from "./pages/ServicesScreen";
import { ReportsScreen } from "./pages/ReportsScreen";
import { SettingsScreen } from "./pages/SettingsScreen";
import { HelpScreen } from "./pages/HelpScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileFrame,
    children: [
      {
        Component: AppShell,
        children: [
          { index: true, Component: Dashboard },
          { path: "calendar", Component: CalendarView },
          { path: "ai", Component: AIHub },
          { path: "menu", Component: Menu },

          // Menu sub-pages
          { path: "profile", Component: ProfileScreen },
          { path: "services", Component: ServicesScreen },
          { path: "clients", Component: ClientsScreen },
          { path: "reports", Component: ReportsScreen },
          { path: "payment", Component: PaymentScreen },
          { path: "notifications", Component: NotificationsScreen },
          { path: "settings", Component: SettingsScreen },
          { path: "help", Component: HelpScreen },
          { path: "shop", Component: ShopScreen },

          { path: "*", element: <Navigate to="/" replace /> },
        ],
      },
      // Welcome splash — rendered without AppShell (no bottom nav)
      { path: "welcome", Component: WelcomeScreen },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
