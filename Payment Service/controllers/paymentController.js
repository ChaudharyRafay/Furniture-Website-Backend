import catchAsync from "../utils/catchAsync.js";

import paymentModel from "../models/paymentModel.js";

export const add = catchAsync(async (req, res) => {


    // console.log(array);
    // console.log(req.body);
    const listing = await paymentModel.create({ ...req.body });
    if (!listing) {
        return res.json({
            success: false,
            status: 500,
            message: "Payment Details could not be added",
        });
    }

    return res.json({
        success: true,
        status: 200,
        message: "Payment Details added successfully",
        listing,
    });
});

export const del = catchAsync(async (req, res) => {
    const existing = await paymentModel.findOne({ _id: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            status: 404,
            message: "Payment Details not found",
        });
    }

    const deleted = await paymentModel.findByIdAndDelete(existing._id);
    if (!deleted) {
        return res.json({
            success: false,
            status: 500,
            message: "Payment Details could not be deleted",
        });
    }

    return res.status(201).json({
        success: true,
        status: 200,
        message: "Payment deleted successfully",
        listing: deleted,
    });
});

export const update = catchAsync(async (req, res) => {
    console.log(req.body.id)
    const existing = await paymentModel.findOne({ _id: req.body.id });
    if (!existing) {
        return res.json({
            success: false,
            status: 404,
            message: "Payment Details not found",
        });
    }

    const listing = await paymentModel.findByIdAndUpdate(
        req.body.id,
        {
            ...req.body,
        },
        {
            new: true,
            runValidators: true
        },

    );

    if (listing) {
        return res.json({
            success: true,
            status: 200,
            message: "Payment Details updated successfully",
            listing,
        });
    }

    return res.json({
        success: false,
        status: 500,
        message: "Payment Details could not be updated",
    });
});



export const get = catchAsync(async (req, res) => {


    const listing = await paymentModel.findOne({ _id: req.params.id });
    if (!listing) {
        return res.json({
            success: false,
            status: 404,
            message: "Payment Details Not found",
        });
    }

    return res.json({
        success: true,
        message: "Payment Details found",
        status: 200,
        listing: listing,
    });
});
