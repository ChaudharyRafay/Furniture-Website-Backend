import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// const key = new NodeRSA({ b: 512 });
// let keypair = {
//     private: key.exportKey(),
//     public: key.exportKey("public")
// };
// console.log(keypair);
// var decoded = jwt.verify("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NzA0MTQ2NzB9.aF5zm0zpnGSw6Z08jvxPabzgL3sW0Xdnc-Gz7669J1l4C-BdtPe7a5Cz3erk_X8XRnp48nklFuUk2wxa5KTT5g",
//     '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKe7FxqRfVG5HboWqmnXKGAAOXkEJTwY\n3KztSYiudkryb6ciP//lEBFKqhBKXM2wMEPfo9f6OkZ2tlE4eNxTkIUCAwEAAQ==\n-----END PUBLIC KEY-----', { algorithms: ['RS256'] });
// console.log(decoded);
// if (!decoded) {
//     return res.json({
//         success: false,
//         status: 404,
//         message: "Invalid Token",
//     });
// }

const auth = catchAsync(async (req, res, next) => {
    console.log(req.headers);
    if (req.headers["authorization"]) {

        let authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
            throw new Error("Bearer Missing in token");
        } else {
            req.jwt = jwt.verify(authorization[1], process.env.SECRET);
            console.log(req.jwt);
            return next();
        }
    }
    else {
        throw new Error("Token Not Found");
    }
    // console.log(err);
    // throw new Error(err);
})
// } 
// });

export default auth;
