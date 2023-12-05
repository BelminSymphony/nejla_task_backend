const express = require("express")
const cors = require("cors")
const { default: mongoose, mongo } = require("mongoose")
const Item = require("./item")

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
app.get("/load",async (req,res)=>{
    try {
        let tasks = await Item.find()
        return res.status(200).json({data:tasks})
    } catch (error) {
        return res.status(500).json({error:error, message: "Error loading all tasks!"})
    }
})

app.get("/load/:id", async(req,res)=>{
    try {
        const id = req.params.id
        let task = await Item.findById(id)
        if(!task){
            return res.status(200).json({ message: `No element with id: ${id}`})
        }
    return res.status(200).json({data: task, message: `Loaded element with id: ${id}`})
    } catch (error) {
        return res.status(500).json({error: error, message: `Error loading item with id ${req.params.id}!`})
    }
})

app.delete("/remove/:id", async(req,res)=>{
    try {
        const id = req.params.id
        await Item.findByIdAndDelete(id)
        return res.status(200).json({message: `Item with id ${id} deleted succesfully!`})
    } catch (error) {
        return res.status(500).json({error: error, message: `Error deleting item with id ${req.params.id}!`})
    }
})

app.post("/add", async(req,res)=>{
    try {
        const data = req.body
        const item = new Item(data)
        await item.save()
        return res.status(200).json({message: `Succesfully added item!`})
    } catch (error) {
        return res.status(500).json({error: error, message: `Error adding item!`})
    }
})

const port = 3001
app.listen(port, ()=>console.log(`Server is started on port ${port}`))