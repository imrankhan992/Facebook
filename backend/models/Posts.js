const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema

const postSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["profilePicture", "cover","backgroundPost","textPost", null],
            default: null,
        },
        text: {
            type: String,
        },
        images: {
            type: Array,
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        background: {
            type: String,
            default: null
        },
        comments: [
            {
                comment: {
                    type: String,
                },
                image: {
                    type: String,
                },
                commentBy: {
                    type: ObjectId,
                    ref: "User",
                },
                commentAt: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
