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
 * /api/paymentDetails/add:
 *   put:
 *     summary:  Add Payment Method from user
 *     tags: [ Add Payment Method]
 *     parameters:
 *          - in: path
 *            name: paymentMethod
 *            description: Choose the payment method ('Visa', 'Master', 'COD')
 *            required : true
 *          - in: path
 *            name: userId
 *            description: Registered User id
 *            required : true
 *          - in: path
 *            name: city
 *            description: User City
 *            required : true
 *          - in: path
 *            name: postalCode
 *            description: User City Postal Code
 *            required : true
 *          - in: path
 *            name: fullAddress
 *            description: fullAddress of User
 *            required : true
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
