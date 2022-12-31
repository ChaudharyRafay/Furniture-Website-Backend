import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import globalErrHandler from "./utils/errorController.js";
import path from "path";
import AppError from "./utils/appError.js";
import swaggerui from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Furniture website ",
      version: "1.0.0",
      description: "User Account Api's",
    },
    servers: [
      {
        url: "http://localhost:5005",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        AddUser: {
          type: "object",
          required: ["fullname", "email", "password", "phoneno", "pfp"],
          properties: {
            fullname: {
              type: "string",
              description: "The author of the book",
            },
            email: {
              type: "string",
              description: "The price of the book",
            },
            password: {
              type: "string",
              description: "The description of the book",
            },
            phoneno: {
              type: "integer",
              description: "The year the book was published",
            },
            pfp: {
              type: "string",
              description: "The year the book was published",
            },
          },
          example: {
            fullname: "John Deo",
            email: "johndeo302@gmail.com",
            password: "johnjohn",
            phoneno: "03451444760",
            pfp: "aaaa",
          },
        },
        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "registered email of the user",
            },
            password: {
              type: "string",
              description: "password",
            },
          },
          example: {
            email: "john@gmail.com",
            password: "john123",
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

const PORT = 5005;

const app = express();
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(express.json());

// import { fileURLToPath } from 'url';
mongoose.connect(process.env.DATABASE);
// import listingRoutes from "./routes/listing.routes.js"

import userRoutes from "./routes/user.routes.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors());
app.use("/api/user", userRoutes);

// app.use("/api/listings", listingRoutes)
app.use("/*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);
app.listen(process.env.PORT || PORT, () => {
  console.log("Server start on port " + PORT);
});
