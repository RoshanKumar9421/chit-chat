
// import express from "express";
// import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { updateProfile } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// //router.put("/update-profile", protectRoute, updateProfile);

// router.get("/check", protectRoute, checkAuth);

// router.put(
//   "/update-profile",
//   protectRoute,
//   upload.single("avatar"), // 👈 MUST MATCH formData key
//   updateProfile
// );

// export default router;

import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js"; // ✅ REQUIRED

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("avatar"), // ✅ matches FormData key
  updateProfile
);

export default router;
