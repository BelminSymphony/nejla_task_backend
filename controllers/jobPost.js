const express = require("express")
const Category = require("../models/category")
const JobPost = require("../models/jobPost")
const router = express.Router()

router.post("/add", async(req,res)=>{
  try {
      const data = req.body
      console.log(data);
      const item = new JobPost(data)
      await item.save()
      return res.status(200).json({message: `Succesfully added job post!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding job post!`})
  }
})

router.get("/load",async (req,res)=>{
  try {
      let tasks = await JobPost.find().populate("jobType").populate("jobCategory")
      return res.status(200).json({data:tasks})
  } catch (error) {
      return res.status(500).json({error:error, message: "Error loading all job posts!"})
  }
})

router.get("/load/:id", async(req,res)=>{
  try {
      const id = req.params.id
      let task = await JobPost.findById(id).populate("jobType").populate("jobCategory")
      if(!task){
          return res.status(200).json({ message: `No JobPost with id: ${id}`})
      }
  return res.status(200).json({data: task, message: `Loaded JobPost with id: ${id}`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error loading JobPost with id ${req.params.id}!`})
  }
})

router.delete("/remove/:id", async(req,res)=>{
  try {
      const id = req.params.id
      await JobPost.findByIdAndDelete(id)
      return res.status(200).json({message: `JobPost with id ${id} deleted succesfully!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error deleting JobPost with id ${req.params.id}!`})
  }
})
router.patch("/update/:id", async(req,res)=>{
  try {
      const id = req.params.id
      const data = req.body
      let item = await JobPost.findOneAndUpdate({_id: id}, data,{returnOriginal: false})
      return res.status(200).json({message: `Succesfully updated JobPost!`, data: item})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding JobPost!`})
  }
})

module.exports = router