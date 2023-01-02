import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import globalErrHandler from "./utils/errorController.js";
import path from "path";
import swaggerui from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import AppError from "./utils/appError.js";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Furniture website ",
      version: "1.0.0",
      description: "Shopping Account Api's",
    },
    servers: [
      {
        url: "http://localhost:5003",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        ShopingCart: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              description: "User Id from shoping Cart",
            },
          },
          example: {
            id: "112k2jk1j2212121",
          },
        },
        AddProductInCart: {
          type: "object",
          required: ["cartId", "productId"],
          properties: {
            cartId: {
              type: "string",
              description: "Cart Id",
            },
            productId: {
              type: "string",
              description: "Product Id",
            },
          },
          example: {
            cartId: "22kj2k12121212121k2",
            productId: "1d1opi1uy2h2rf121k2g1f21kp21",
          },
        },
      },
      // responses: {
      //   // 400: {
      //   //     description: 'Missing API key - include it in the Authorization header',
      //   //     contents: 'application/json'
      //   // },
      //   // 401: {
      //   //     description: 'Unauthorized - incorrect API key or incorrect format',
      //   //     contents: 'application/json'
      //   // },
      //   500: {
      //     description: "Product could not be added",
      //     contents: "application/json",
      //   },
      // },
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const PORT = 5003;

const app = express();
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(express.json());

// import { fileURLToPath } from 'url';
mongoose.connect(process.env.DATABASE);
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import productInCartRoutes from "./routes/productInCart.routes.js";

// import userRoutes from "./routes/user.routes.js"

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors());
app.use("/api/shoppingCart", shoppingCartRoutes);
app.use("/api/productInCart", productInCartRoutes);

app.use("/*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);
app.listen(process.env.PORT || PORT, () => {
  console.log("Server start on port " + PORT);
});
