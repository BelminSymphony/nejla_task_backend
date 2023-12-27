const express = require("express")
const JobType = require("../models/jobType")
const router = express.Router()

router.post("/add", async(req,res)=>{
  try {
      const data = req.body
      console.log(data);
      const item = new JobType(data)
      await item.save()
      return res.status(200).json({message: `Succesfully added JobType!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding JobType!`})
  }
})

router.get("/load",async (req,res)=>{
  try {
      let tasks = await JobType.find()
      return res.status(200).json({data:tasks})
  } catch (error) {
      return res.status(500).json({error:error, message: "Error loading all JobType!"})
  }
})

router.get("/load/:id", async(req,res)=>{
  try {
      const id = req.params.id
      let task = await JobType.findById(id)
      if(!task){
          return res.status(200).json({ message: `No category with id: ${id}`})
      }
  return res.status(200).json({data: task, message: `Loaded category with id: ${id}`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error loading category with id ${req.params.id}!`})
  }
})

router.delete("/remove/:id", async(req,res)=>{
  try {
      const id = req.params.id
      await JobType.findByIdAndDelete(id)
      return res.status(200).json({message: `JobType with id ${id} deleted succesfully!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error deleting JobType with id ${req.params.id}!`})
  }
})
router.patch("/update/:id", async(req,res)=>{
  try {
      const id = req.params.id
      const data = req.body
      let item = await JobType.findOneAndUpdate({_id: id}, data,{returnOriginal: false})
      return res.status(200).json({message: `Succesfully updated JobType!`, data: item})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding JobType!`})
  }
})

module.exports = router