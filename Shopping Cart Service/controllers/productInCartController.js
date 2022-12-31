import catchAsync from "../utils/catchAsync.js";
import productInCartModel from "../models/productInCartModel.js";
import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
// import { format } from 'date-fns'

export const get = catchAsync(async (req, res) => {
    //here id will be cart id
    const listing = await productInCartModel.find({ cart: req.params.id });
    if (!listing) {
        return res.json({
            success: false,
            status: 404,
            message: "Products Not found",
        });
    }
    const arry = [];
    for (let i = 0; i < listing.length; i++) {
        const { data } = await axios.get(`${process.env.PRODUCT_URL}/api/product/get/${listing[i].productId}`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg3MWVmZmFmM2E1YjM2YzNlMjMwZjQiLCJpYXQiOjE2NzA2NDc1NjB9.Y3dhZc3Wb_HraHAwfYT3ZJQUZujAslAc1YUu7POxthE` }
        });
        // console.log(data);
        arry.push({
            id: data?.listing?._id,
            name: data?.listing?.name,
            price: data?.listing?.price,
            image: data?.listing?.image,
            stockQuantity: data?.listing?.stockQuantity
        });
    }

    // listing.map(async (element, index) => {
    //     const { data } = await axios.get(`${process.env.PRODUCT_URL}/api/product/get/${element.productId}`);
    //     console.log(data);
    // })

    console.log("hasnat");
    console.log(arry);
    //localhost:5001/api/product/get/6384fd90526b0f84f044c613
    // console.log(listing);

    return res.json({
        success: true,
        message: "Products found",
        status: 200,
        listing: arry,
    });
});

export const add = catchAsync(async (req, res) => {


    // console.log(array);
    // console.log(req.body);
    const listing = await productInCartModel.create({ ...req.body });
    if (!listing) {
        return res.json({
            success: false,
            status: 500,
            message: "Product could not be added in to the cart",
        });
    }
    // axios.put("localhost:5001/api/product/update")
    const { data } = await axios.get(`${process.env.PRODUCT_URL}/api/product/updateCount/${req.body.productId}`)
    console.log(data);
    if (data.status !== 200) {
        return res.json({
            success: false,
            status: 500,
            message: "Product could not be added in to the cart",
        });
    }

    return res.json({
        success: true,
        status: 200,
        message: "Product added in to the cart successfully",
        listing,
    });
});

export const del = catchAsync(async (req, res) => {
    //here id will be product id
    const existing = await productInCartModel.findOne({ productId: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            status: 404,
            message: "Product not found in the cart",
        });
    }

    const deleted = await productInCartModel.findByIdAndDelete(existing._id);
    if (!deleted) {
        return res.json({
            success: false,
            status: 500,
            message: "Product could not be removed from cart",
        });
    }
    const { data } = await axios.get(`${process.env.PRODUCT_URL}/api/product/updateCountInc/${req.params.id}`)
    console.log(data);
    if (data.status !== 200) {
        return res.json({
            success: false,
            status: 500,
            message: "Product could not be removed from cart",
        });
    }


    return res.status(201).json({
        success: true,
        status: 200,
        message: "Product removed from cart successfully",
        listing: deleted,
    });
});



export const delCartProducts = catchAsync(async (req, res) => {
    //here id will be cart id
    const existing = await productInCartModel.deleteMany({ cartId: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            status: 404,
            message: "Product not found in the cart",
        });
    }
    return res.status(201).json({
        success: true,
        status: 200,
        message: "Product removed from cart successfully",

    });

})