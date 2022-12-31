import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({

    price: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
    },


    image: {
        required: true,
        type: String
    },

});

export default model("Products", userSchema);
