import { Router } from "express";
const route = Router();
import {
  login,
  add,
  // update,
  // updatePassword,
  get,
  newToken,
  // del,
  // block,
  // unblock,
  // verifyOtp,
  // getAll,
  // getByEmail,
  // changePassword,
  uploadPfp,
} from "../controllers/userController.js";

import imageUploader from "../utils/profilePictureUploader.js";
// import auth from "../middleware/auth.js";

// route.get("/getAll", getAll);
// route.get("/get/:id", get);

/**
 * @swagger
 * tags:
 *   name: Add user
 *   description:  Add User info into Database
 */

/**
 * @swagger
 * /api/user/add:
 *   put:
 *     summary: Add User
 *     tags: [Add user]
 *     parameters:
 *          - in: path
 *            name: fullName
 *            description: Fullname of the User
 *            required : true
 *          - in: path
 *            name: email
 *            description: Email of the User
 *            required : true
 *          - in: path
 *            name: password
 *            description: Password
 *            required : true
 *          - in: path
 *            name: phoneNo
 *            description: User phoneno
 *            required : true
 *     responses:
 *       200:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddUser'
 */
route.put("/add", add);

/**
 * @swagger
 * tags:
 *   name:Login user
 *   description: User login the website
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login the website
 *     tags: [Login user]
 *     parameters:
 *          - in: path
 *            name: email
 *            description: Registerede email of the user
 *            required : true
 *          - in: path
 *            name: password
 *            description: Password
 *            required : true
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoginUser'
 */

route.post("/login", login);
route.get("/get/:id", get);
route.post("/newAccessToken", newToken);

route.put(
  "/uploadPfp",
  [(...rest) => imageUploader("profile-photo", ...rest)],
  uploadPfp
);

export default route;
