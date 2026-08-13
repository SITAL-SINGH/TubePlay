import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,  // cloudanary url
            required: true, 
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // from cloudanary as it automatically sends video duration
            required: true,
        },
        views : {
            type: Number,
            default: 0,

        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    }, {timestamps: true});

videoSchema.plugin(mongoosePaginate()); // we injected the plugin in our schema



export const Video = mongoose.model("Video", videoSchema);