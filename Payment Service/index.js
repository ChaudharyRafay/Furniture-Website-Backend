import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import globalErrHandler from "./utils/errorController.js";
import path from "path";
import dotenv from "dotenv";
import AppError from "./utils/appError.js";
import swaggerui from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
dotenv.config();

const PORT = 5002;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Furniture website ",
      version: "1.0.0",
      description: "Payemnt Method Api's",
    },
    servers: [
      {
        url: "http://localhost:5002",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        PaymentMethod: {
          type: "object",
          required: [
            "userId",
            "paymentMethod",
            "city",
            "postalCode",
            "FullAddress",
          ],
          properties: {
            userId: {
              type: "string",
              description: "User Id",
            },
            paymentMethod: {
              type: "string",
              description: "Payment methods ('Visa', 'Master', 'COD') ",
            },
            city: {
              type: "string",
              description: "User City",
            },
            postalCode: {
              type: "string",
              description: "User PostalCode",
            },
            FullAddress: {
              type: "string",
              description: "User Home Address",
            },
          },
          example: {
            userId: "112k2jk1j2212121",
            paymentMethod: "Visa",
            city: "Rawalpindi",
            postalCode: "46000",
            FullAddress: "Defense Pakistan",
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
      responses: {
        // 400: {
        //     description: 'Missing API key - include it in the Authorization header',
        //     contents: 'application/json'
        // },
        // 401: {
        //     description: 'Unauthorized - incorrect API key or incorrect format',
        //     contents: 'application/json'
        // },
        500: {
          description: "Product could not be added",
          contents: "application/json",
        },
      },
      // securitySchemes: {
      //     ApiKeyAuth: {
      //         type: 'apiKey',
      //         in: 'header',
      //         name: 'Authorization'
      //     }
      //   }
    },
    //   security: [{
    //     ApiKeyAuth: []
    //   }]
  },
  apis: ["./routes/*.js"],
};
const app = express();
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(express.json());

// import { fileURLToPath } from 'url';
mongoose.connect(process.env.DATABASE);
// import listingRoutes from "./routes/listing.routes.js"

import paymentRoutes from "./routes/payment.routes.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors());
app.use("/api/paymentDetails", paymentRoutes);

app.use("/*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);
app.listen(process.env.PORT || PORT, () => {
  console.log("Server start on port " + PORT);
});
