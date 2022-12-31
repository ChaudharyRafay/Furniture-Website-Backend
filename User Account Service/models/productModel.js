import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
    desc: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false
    },


    stockQuantity: {
        type: Number,
        required: false,
    },


    images: {
        required: false,
        type: Array
    },

});

export default model("Products", userSchema);
