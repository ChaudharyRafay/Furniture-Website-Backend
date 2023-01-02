import catchAsync from "../utils/catchAsync.js";

import shoppingCartModel from "../models/shoppingCartModel.js";

export const create = catchAsync(async (req, res) => {
  console.log(req.body);
  // console.log(array);
  // console.log(req.body);
  const listing = await shoppingCartModel.create({ ...req.body });
  if (!listing) {
    return res.json({
      success: false,
      status: 500,
      message: "Shopping cart could not be created",
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Shopping cart created successfully",
    listing,
  });
});

export const getCardId = catchAsync(async (req, res) => {
  // console.log(array);
  // console.log(req.body);
  const listing = await shoppingCartModel.findOne({ userId: req.params.id });
  if (!listing) {
    return res.json({
      success: false,
      status: 500,
      message: "Shopping cart not found",
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Shopping cart found",
    listing,
  });
});
