import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const shoppingCartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: true
    },




});

export default model("ShoppingCarts", shoppingCartSchema);
