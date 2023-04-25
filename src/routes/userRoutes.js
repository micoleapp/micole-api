const { Router } = require("express");
const userRouter = Router();

const { getUsers, getUserById, deleteUserById } = require("../controllers/userController");
/* const { requireAuth } = require("../middlewares/auth"); */

userRouter.get("/", getUsers);
userRouter.get("/:idUser", getUserById);
userRouter.delete("/:idUser", deleteUserById);

module.exports = userRouter;