const express = require("express")
const cors = require("cors")
const { default: mongoose, mongo } = require("mongoose")
const categoryController = require("./controllers/category")
const jobController = require("./controllers/jobPost")
const userController = require("./controllers/user")
const jobTypeController = require("./controllers/jobType")
const auth = require("./middleware/auth")

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://belmin:belmin123@cluster0.j7b7ebb.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once("open", ()=>{
    console.log("Connected to db ");
})


app.use("/category", categoryController)
app.use("/jobpost",auth, jobController)
app.use("/user", userController)
app.use("/jobtype", auth, jobTypeController)


const port = 3001
app.listen(port, ()=>console.log(`Server is started on port ${port}`))