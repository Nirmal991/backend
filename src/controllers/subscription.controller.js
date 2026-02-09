import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from '../models/user.model.js'
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user?._id;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel Id")
    }

    if (channelId === subscriberId) {
        throw new ApiError(400, "Cannot Subscribe to yourself")
    }

    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
    });

    let subscribed;
    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id)
        subscribed = false;
    } else {
        await Subscription.create({
            channelId: channelId,
            subscriberId: subscriberId
        });
        subscribed = true;
    }

    // const subscriberCount = await Subscription.countDocuments({
    //     channel: channelId,
    // })

    return res.status(200).json(
        new ApiResponse(200, { subscribed }, subscribed ? "Subscribed Successfully" : "Unsubscribed successfully")
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!channelId) {
        return new ApiError(400, "Please enter a valid channelId")
    }

    const subscriber = await Subscription.find({channel: channelId})
    .populate("subscriber", "username, fullName email password avatar")
    .sort({ createdAt: -1});

    return res.status(200).json({
        success: true,
        count: subscriber.length,
        subscriber
    })
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
})


export { toggleSubscription, getUserChannelSubscribers };