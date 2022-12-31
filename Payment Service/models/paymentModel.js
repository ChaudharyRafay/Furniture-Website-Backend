import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const paymentSchema = new Schema({


    paymentMethod: {
        type: String,
        enum: ['Visa', 'Master', 'COD'],
        required: false,
        default: 'COD'
    },

    userId: {
        type: Types.ObjectId
    },
    city: {
        type: String,
        required: false,
    },


    postalCode: {
        required: false,
        type: Number
    },
    fullAddress: {
        type: String,
        required: false
    }

});

export default model("Payments", paymentSchema);
