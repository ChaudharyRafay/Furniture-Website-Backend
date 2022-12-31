import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },

    phoneNo: {
        type: String,
        required: false,
    },


    pfp: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: String
    }

});

export default model("Users", userSchema);
