const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp, forgotPassword, editAuthById, getAuth, putAuth, resetPassword, passRecovery, passRecoveryNewPassword } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/auth");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password",  resetPassword);
authRouter.post("/recovery",  passRecovery);
authRouter.post("/reset",  passRecoveryNewPassword);
authRouter.put("/", requireAuth, editAuthById);
authRouter.get("/", getAuth);
authRouter.put("/:id", putAuth);

module.exports = authRouter;