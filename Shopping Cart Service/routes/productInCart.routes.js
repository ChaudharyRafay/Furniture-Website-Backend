import { Router } from "express";
const route = Router();
import {
  add,
  get,
  del,
  delCartProducts,
} from "../controllers/productInCartController.js";
import auth from "../middleware/auth.js";
/**
 * @swagger
 * tags:
 *   name: Add product
 *   description: Get product from shoping cart
 */

/**
 * @swagger
 * /api/productInCart/get/{id}:
 *   get:
 *     summary: Add product in shoping cart
 *     tags: [Add product]
 *     responses:
 *       200:
 *         description:Add product in shoping cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddProductInCart'
 */
route.put("/add", auth, add);
/**
 * @swagger
 * tags:
 *   name: Get product
 *   description: Get product from shoping cart
 */

/**
 * @swagger
 * /api/productInCart/get/{id}:
 *   get:
 *     summary: Get product from shoping cart
 *     tags: [Get product]
 *     responses:
 *       200:
 *         description: Products found from shoping cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddProductInCart'
 */
route.get("/get/:id", auth, get);
/**
 * @swagger
 * tags:
 *   name: Delete product
 *   description: Delete product from shoping cart
 */

/**
 * @swagger
 * /api/productInCart/remove/{id}:
 *   delete:
 *     summary:  Delete product from shoping cart
 *     tags: [ Delete product]
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShopingCart'
 */

route.delete("/remove/:id", auth, del);
/**
 * @swagger
 * tags:
 *   name: Delete All Products
 *   description: Delete All Products from shoping cart
 */

/**
 * @swagger
 * /api/productInCart/remove/cartProducts/{id}:
 *   delete:
 *     summary:  Delete All Products from shoping cart
 *     tags: [ Delete All Products]
 *     responses:
 *       200:
 *         description: All Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShopingCart'
 */

route.delete("/remove/cartProducts/:id", auth, delCartProducts);
// route.post("/login", login);
// route.get("/get/:id", get);

export default route;
