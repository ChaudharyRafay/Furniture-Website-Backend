import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const productInCartSchema = new Schema({

    cartId: {
        type: Types.ObjectId,
        required: false
    },
    productId: {
        type: Types.ObjectId,
        required: false
    }




});

export default model("ProductsInCarts", productInCartSchema);
