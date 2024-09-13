const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        text: true,
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        text: true,
    },

    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        text: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dbcopekhr/image/upload/v1724406930/5b305fca208d6162872c715f4c7643e1_bcpefg.jpg",
    },
    cover: {
        type: String,
        default: "https://cover.iran.liara.run/public",
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
    },
    bYear: {
        type: Number,
        required: [true, "Birth Year is required"],
    },
    bMonth: {
        type: Number,
        required: [true, "Birth Month is required"],
    },
    bDay: {
        type: Number,
        required: [true, "Birth Day is required"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: [ObjectId],
        default: [],
    },
    requests: {
        type: [ObjectId],
        default: [],
    },
    followers: {
        type: [ObjectId],
        default: [],
    },
    followings: {
        type: [ObjectId],
        default: [],
    },
    posts: {
        type: [ObjectId],
        default: [],
    },
    search: {
        type: ObjectId,
        ref: "User",
    },
   
    resetCodeExpires: {
        type: Date,
    },
    resetCode:{
        type: String,
    },
    resetJwtToken:{
        type: String,
    },
    resetJwtTokenExpires:{
        type: Date,
    },
    details: {
        bio: {
            type: String,
            default: "",
        },
        otherName: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        region: { type: String },
        ipAddress: { type: String, required: false },
        work: {
            type: String,
            default: "",
        },
        relationship: {
            type: String,
            enum: ["Single", "Married", "In a Relationship", "Engaged", "It's Complicated", "Separated", "Divorced", "Widowed"],
        },
        website: {
            type: String,
            default: "",
        },
        job: {
            type: String,
            default: "",
        },
        highSchool: {
            type: String,
            default: "",
        },
        college: {
            type: String,
            default: "",
        },
        university: {
            type: String,
            default: "",
        },
        currentCity: {
            type: String,
            default: "",
        },
        hometown: {
            type: String,
            default: "",
        },
        skills: {
            type: String,
            default: "",
        },
        languages: [
            {
                language: {
                    type: String,
                    default: "",
                },
                level: {
                    type: String,
                    enum: ["Native", "Fluent", "Intermediate", "Beginner"],
                },
            },
        ],
        instagram: {
            type: String,
            default: "",
        },
    },
    savedPosts: [
        {
            post: {
                type: ObjectId,
                ref: "Post",
            },
            savedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
