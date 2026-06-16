import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: ""
    },
    
    role: {
        type: String,
        enum: ["customer", "owner"],
        default: "customer",
    },

    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;