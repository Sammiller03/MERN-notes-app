import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    // per user
    try {
        const {success} = await ratelimit.limit("limit-key"); // like an ip address to see if the same person is spamming requests

        if (!success) {
            return res.status(429).json({ message : "Too many requests, try again later."});
        }

        // Otherwise, we can call the next GET or PUT etc function next because the rate limit is not exceeded yet
        next() // you can move onto returning or next method, i.e you've passed the checks

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;