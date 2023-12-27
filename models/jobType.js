const mongoose = require("mongoose")

const JobTypeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const JobType = mongoose.model("JobType", JobTypeSchema)

module.exports = JobType