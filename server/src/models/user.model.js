import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Todo"
            }
        ]
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bycrpt.hash(this.password, 11);
    next();
});

userSchema.methods.isPasswordMatched = async function (password) {
    return await bycrpt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);