import express from "express";

import {
  editUndertaker,
  getallundertakers,
  getASingleUndertaker,
  loginUndertaker,
  registerUndertaker,
  undertakerdashboard,
} from "../controllers/Undertaker/undertaker.controller.js";
import { protect10 } from "../middleware/authMiddleware.js";
const undertakerRouter = express.Router();

undertakerRouter.post("/register", registerUndertaker);
undertakerRouter.post("/login", loginUndertaker);
undertakerRouter.get("/dashboard", protect10, undertakerdashboard);
undertakerRouter.put("/:id", protect10, editUndertaker);
undertakerRouter.get("/", getallundertakers);
undertakerRouter.get("/anundertaker/:id", getASingleUndertaker);

export default undertakerRouter;
