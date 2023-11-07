import express, { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "../utils/getAccessToken";
import { requiresAuth } from "express-openid-connect";

var router = express.Router();
// internal imports
const resendEmailController = require("../controllers/resendEmail.controller");
//const resetPasswordController = require("../controllers/resetPassword.controller");
const usersController = require("../controllers/users.controller");

router.get("/", (req: any, res: any) => {
  res.render("index", {
    title: "Express APP",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/dashboard", requiresAuth(), usersController.dashboard);

router.post("/verify-email", requiresAuth(), resendEmailController.resendEmail);
router.get("/verify-email", requiresAuth(), resendEmailController.resendEmail);

router.get("/admin", usersController.usersDashboard);

export default router;
