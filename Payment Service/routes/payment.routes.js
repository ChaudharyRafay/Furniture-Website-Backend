import { Router } from "express";
const route = Router();
import { add, update, get, del } from "../controllers/paymentController.js";

import auth from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   name: Add Payment Method
 *   description:  Add Payment Method from user
 */

/**
 * @swagger
 * /api/productInCart/remove/{id}:
 *   put:
 *     summary:  Add Payment Method from user
 *     tags: [ Add Payment Method]
 *     responses:
 *       200:
 *         description: Payment Details added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 */

route.put("/add", auth, add);
route.get("/get/:id", auth, get);
route.put("/update", auth, update);
route.delete("/del/:id", auth, del);

export default route;
