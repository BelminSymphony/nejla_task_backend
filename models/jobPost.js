const mongoose = require("mongoose");

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobCategory',
        required: true
    },
    jobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobType',
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
});

const JobPost = mongoose.model("JobPost", JobSchema);

module.exports = JobPost;
