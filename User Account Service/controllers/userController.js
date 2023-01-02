import Users from "../models/userModel.js";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { hash, check } from "../utils/crypt.js";
import bcrypt from "bcrypt";
const { hashSync } = bcrypt;
import { config } from "dotenv";
import NodeRSA from "node-rsa";
import userModel from "../models/userModel.js";
config();

//Login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user)
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Incorrect Email",
    });

  if (!check(password, user.password))
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Incorrect Password",
    });
  var refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESHSECRET);

  var token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  const data = await userModel.updateOne(
    { _id: user._id },
    { refreshToken: refreshToken }
  );
  console.log(token);
  console.log(data);
  return res.json({
    success: true,
    status: 200,
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.fullName,
      token: token,
      refreshToken: refreshToken,
    },
  });
});

//Add
export const newToken = catchAsync(async (req, res) => {
  const data = await userModel.findOne({ refreshToken: req.body.refreshToken });
  console.log("called");
  if (data) {
    var token = jwt.sign({ userId: data._id }, process.env.SECRET, {
      expiresIn: "30s",
    });

    return res.json({
      success: true,
      status: 200,
      token: token,
    });
  } else {
    return res.json({
      success: false,
      status: 500,
      message: "Access Token not found",
    });
  }
});
export const add = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const isEmailUnique = await checkEmail(req.body.email);
  // console.log(isEmailUnique);
  if (!isEmailUnique)
    return res.json({
      success: false,
      status: 400,
      message: "Email already exists",
    });

  const userData = JSON.parse(JSON.stringify(req.body));

  userData.password = hashSync(userData.password, 10);

  const user = await Users.create(userData);
  if (!user) {
    return res.json({
      success: false,
      status: 500,
      message: "User could not be added",
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "User signed up successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      // name: `${user.firstName} ${user.lastName}`,
    },
  });
});

// const updateUser = async (id, user) => {
//     let updatedUser = null;
//     const result = await Users.findByIdAndUpdate(id, user, { new: true });
//     if (result) updatedUser = await getUser({ _id: result._id });
//     return updatedUser;
// };

// //Update
// export const update = catchAsync(async (req, res, next) => {
//     const existing = await Users.findOne({ _id: req.body.id });
//     if (!existing) return res.json({
//         success: false,
//         message: "User not found"
//     })

//     const { id, email } = req.body;
//     if (email) {
//         if (email !== existing.email) {
//             const isEmailUnique = await checkEmail(email);
//             if (!isEmailUnique) return res.json({
//                 success: false,
//                 message: "Email already exists"
//             })
//         }
//     }

//     const data = JSON.parse(JSON.stringify(req.body));

//     if (data.password) {
//         delete data.password
//     }

//     const user = await updateUser(id, data);

//     if (user) {
//         return res.json({
//             success: true,
//             message: "User updated successfully",
//             user,
//         });
//     }

//     return res.json({
//         success: false,
//         message: "User could not be updated",
//     });
// });

//Get All
// export const getAll = async (_, res) => {
//     const users = await Users.find();
//     if (users.length > 0) {
//         return res.json({
//             success: true,
//             status: 200,
//             message: "Users found",
//             users,
//         });
//     }
//     return res.json({
//         success: false,
//         status: 404,
//         message: "Users not found"
//     })
// };

//Get One
export const get = catchAsync(async (req, res, next) => {
  const user = await getUser({
    _id: mongoose.Types.ObjectId(req.params.id),
  });
  if (!user)
    return res.json({
      success: false,
      status: 404,
      message: "User not found",
    });

  return res.json({
    success: true,
    status: 200,
    message: "User found",
    user,
  });
});

//Delete
// export const del = catchAsync(async (req, res, next) => {
//     const existing = await Users.findOne({ _id: req.params.id });
//     if (!existing) {
//         return res.json({
//             success: false,
//             status: 200,
//             message: "User not found"
//         })
//     }

//     const deletedUser = await Users.findOneAndDelete({ _id: req.params.id });
//     if (!deletedUser) return res.json({
//         success: false,
//         status: 404,
//         message: "User not found"
//     })

//     return res.json({
//         success: true,
//         status: 200,
//         message: "User deleted successfully",
//         user: deletedUser,
//     });
// });

export const uploadPfp = catchAsync(async (req, res) => {
  if (!req.file)
    res.json({
      success: false,
      message: "Profile Picture not uploaded.",
    });

  const pfp = req.file.path;
  res.json({ success: true, message: "Profile Picture Uploaded", pfp });
});

async function checkEmail(email) {
  let result = await Users.find({ email });
  console.log(result);
  return !result.length;
}

async function getUsers(query = null) {
  let users = [];
  if (query) {
    users = await Users.aggregate([
      {
        $match: { ...query },
      },
    ]);
  } else users = await Users.find();

  return users;
}

async function getUser(query) {
  const users = await getUsers(query);
  return users[0];
}

// const { email, password } = req.body;

// // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// // const key = new NodeRSA({ b: 512 });
// // let keypair = {
// //     private: key.exportKey(),
// //     public: key.exportKey(process.env.PUBLICKEY)
// // };
// // console.log(keypair);
// // const token = jwt.sign({ foo: 'bar' }, keypair.private, { algorithm: "RS256" }, { expiresIn: "60s" });
// var token = jwt.sign({ foo: 'bar' }, 'hasnat', { expiresIn: '30s' });
// console.log(token);
// // console.log(process.env.PRIVATEKEY);
// // console.log("User", obj);
// const user = await Users.findOne({ email });
// if (!user) return res.status(400).json({
//     success: false,
//     status: 400,
//     message: "Incorrect Email"
// })

// if (!check(password, user.password))
//     return res.status(400).json({
//         success: false,
//         status: 400,
//         message: "Incorrect Password"
//     });

// return res.json({
//     success: true,
//     status: 200,
//     message: "User logged in successfully",
//     user: {
//         id: user._id,
//         email: user.email,
//         name: user.fullName,
//         token: token,

//     },
// });
