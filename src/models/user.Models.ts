import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

// interface TokenPayload extends JwtPayload {
//     id: string;
//     email: string;
//     username: string;   
// }

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localath: String
        },
        default: {
            url: "https://www.vecteezy.com/vector-art/58100620-default-profile-picture-icon-avatar-photo-placeholder",
            localpath: ""
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationExpiry: {
        type: Date,
    }
},
    { timestamps: true });

userSchema.pre("save", async function () {
    // if (!this.isModified("password")) return next();
    // this.password = await bcrypt.hash(this.password, 10);
    // next();

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    const options: SignOptions = {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || '15m') as any
    }
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username
        }, process.env.ACCESS_TOKEN_SECRET || '5m',
        options
    )
}
// Check the expiry time format and secret key for refresh token
userSchema.methods.generateRefreshToken = async function () {
    const options: SignOptions = {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || '15m') as any
    }
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username
    },  process.env.REFRESH_TOKEN_SECRET || '7d',
        options
    )
}

userSchema.methods.generateTemporaryToken = function () { 
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpirt = Date.now() + 20 * 60 * 1000 // 20 minutes
    
    return { unHashedToken, hashedToken, tokenExpirt };
}


export const User = mongoose.model("User", userSchema);