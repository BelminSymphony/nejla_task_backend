const { default: mongoose } = require("mongoose")
const mognoose = require("mongoose")

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    fulfillment: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
})

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item