import { Router } from "express";
const route = Router();
import { create, getCardId } from "../controllers/shoppingCartController.js";
/**
 * @swagger
 * tags:
 *   name: User Shoping Cart
 *   description:  Create User Shoping Cart
 */

/**
 * @swagger
 * /api/shoppingCart/create:
 *   put:
 *     summary: Create User Shoping Cart
 *     tags: [User Shoping Cart]
 *     responses:
 *       200:
 *         description: Shopping cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShopingCart'
 */
route.put("/create", create);
/**
 * @swagger
 * tags:
 *   name: Users Shoping Cart
 *   description: get User Shoping Cart
 */

/**
 * @swagger
 * /api/shoppingCart/getCartId/{id}:
 *   get:
 *     summary: get User Shoping Cart
 *     tags: [Users Shoping Cart]
 *     responses:
 *       200:
 *         description: Shopping cart found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShopingCart'
 */

route.get("/getCartId/:id", getCardId);

// route.post("/login", login);
// route.get("/get/:id", get);

export default route;
