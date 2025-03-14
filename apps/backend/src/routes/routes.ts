import { Router } from "express";
import { authRoutes } from "./auth/auth";
import { userRoutes } from "./users/user";
import { adminroutes } from "./admin/admin";
import { challengesRoutes } from "./challenges/challenges";
import { notificationRoutes } from "./notifications/notification";
import { healthRoutes } from "./health/health";
import { transactionRoutes } from "./transactions/transaction";

export const rootRoutes = Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/user",userRoutes);
rootRoutes.use("/admin",adminroutes);
rootRoutes.use("/challenges",challengesRoutes);
rootRoutes.use("/notifications",notificationRoutes);
rootRoutes.use("/health",healthRoutes);
rootRoutes.use("/transactions",transactionRoutes);
