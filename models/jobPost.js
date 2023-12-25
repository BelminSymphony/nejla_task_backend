const mongoose = require("mongoose")

const JobSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    salaryMin: {
        type: Number,
        required: true
    },
    salaryMax: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    applicationDeadline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const JobPost = mongoose.model("JobPost", JobSchema)

module.exports = JobPost