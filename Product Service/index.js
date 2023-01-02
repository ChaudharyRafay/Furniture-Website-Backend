import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import globalErrHandler from "./utils/errorController.js";
import path from "path";
import AppError from "./utils/appError.js";
import dotenv from "dotenv";
import swaggerui from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";

dotenv.config();

const PORT = 5006;

const app = express();
app.use(express.json());

// import { fileURLToPath } from 'url';
mongoose.connect(process.env.DATABASE);
import productRoutes from "./routes/product.routes.js";
// import options from "./swagger";
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore CRUD REST API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5006",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Products: {
          type: "object",
          required: ["id", "name", "price", "stockQuantity", "image"],
          properties: {
            id: {
              type: "string",
              description: "The author of the book",
            },
            price: {
              type: "integer",
              description: "The price of the book",
            },
            name: {
              type: "string",
              description: "The description of the book",
            },
            stockQuantity: {
              type: "integer",
              description: "The year the book was published",
            },
            image: {
              type: "integer",
              description: "The year the book was published",
            },
          },
          example: {
            id: "12j1h2j1k",
            price: 199,
            name: "rafay",
            stockQuantity: 5,
            image: "rafay.png",
          },
        },
        Productimages: {
          type: "object",
          required: ["id", "image"],
          properties: {
            id: {
              type: "string",
              description: "The author of the book",
            },
            image: {
              type: "string",
              description: "Product Images",
            },
          },
          example: {
            id: "12j1h2j1k",
            image: "rafay.png",
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

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "A simple express library api",
//     },
//     servers: [
//       {
//         url: "http://localhost:5006/",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(cors());
app.use(express.static("public"));
// app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes);

app.use("/*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);
app.listen(process.env.PORT || PORT, "0.0.0.0", () => {
  console.log("Server start on port " + PORT);
});
