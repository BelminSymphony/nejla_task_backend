const express = require("express")
const Category = require("../models/category")
const router = express.Router()

router.post("/add", async(req,res)=>{
  try {
      const data = req.body
      console.log(data);
      const item = new Category(data)
      await item.save()
      return res.status(200).json({message: `Succesfully added category!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding category!`})
  }
})

router.get("/load",async (req,res)=>{
  try {
      let tasks = await Category.find()
      return res.status(200).json({data:tasks})
  } catch (error) {
      return res.status(500).json({error:error, message: "Error loading all categories!"})
  }
})

router.get("/load/:id", async(req,res)=>{
  try {
      const id = req.params.id
      let task = await Category.findById(id)
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
      await Category.findByIdAndDelete(id)
      return res.status(200).json({message: `Category with id ${id} deleted succesfully!`})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error deleting category with id ${req.params.id}!`})
  }
})
router.patch("/update/:id", async(req,res)=>{
  try {
      const id = req.params.id
      const data = req.body
      let item = await Category.findOneAndUpdate({_id: id}, data,{returnOriginal: false})
      return res.status(200).json({message: `Succesfully updated category!`, data: item})
  } catch (error) {
      return res.status(500).json({error: error, message: `Error adding category!`})
  }
})

module.exports = router