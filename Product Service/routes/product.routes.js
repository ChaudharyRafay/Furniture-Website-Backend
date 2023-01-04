import { Router } from "express";
const route = Router();
import {
  add,
  update,
  // updatePassword,
  uploadImages,
  del,
  get,
  updateCount,
  updateCountInc,
  // block,
  // unblock,
  // verifyOtp,
  getAll,
  // getByEmail,
  // changePassword,
} from "../controllers/productController.js";

import imageUploader from "../utils/productImageController.js";
import auth from "../middleware/auth.js";
/**
 * @swagger
 * tags:
 *   name: Get All Products
 *   description: Get All Products from Database
 */

/**
 * @swagger
 * /api/product/getAll:
 *   get:
 *     summary: to get all products
 *     tags: [Get All Products]
 *     responses:
 *       "200":
 *         description: Gets all products successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 */
route.get("/getAll", auth, getAll);

route.get("/get/:id", auth, get);
route.get("/updateCount/:id", updateCount);
route.get("/updateCountInc/:id", updateCountInc);

/**
 * @swagger
 * tags:
 *   name: Upload Product
 *   description:  Add Product into Database
 */

/**
 * @swagger
 * /api/product/add:
 *   put:
 *     summary: Add Product into Database -> You must execute upload image api before this api
 *     tags: [Upload Product]
 *     parameters:
 *          - in: path
 *            name: Name of Product
 *            description: Name of Product that shown in our website
 *            required : true
 *          - in: path
 *            name: price
 *            description: Price of the product
 *            required : true
 *          - in: path
 *            name: StockQuantity
 *            description: StockQuantity of the product
 *            required : true
 *          - in: path
 *            name: Image path name
 *            description: Image full path name
 *            required : true
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *       "500":
 *           $ref: '#/components/responses/500'
 */
route.put("/add", auth, add);
route.delete("/del/:id", auth, del);
route.put("/update", auth, update);
// route.post("/login", login);
// route.get("/get/:id", get);

/**
 * @swagger
 * tags:
 *   name: Upload Product Images
 *   description: To Upload Product Images
 */

/**
 * @swagger
 * /api/product/upload-images:
 *   post:
 *     summary: Upload  Product Images
 *     tags: [Upload Product Images]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *              # 'file' will be the field name in this multipart request
 *                product-images:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Images Uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Productimages'
 */
route.post(
  "/upload-images",
  [(...rest) => imageUploader("product-images", 1, ...rest)],
  uploadImages
);

export default route;
