import express from "express";
const vintageRouter = express.Router();

vintageRouter.get("/", (req, res) => {
  res.render("../views/vintage.ejs")
});

vintageRouter.get("/buycheap", (req, res) => {
  res.render("../views/subpages/buycheap.ejs")
});

vintageRouter.get("/buylegends", (req, res) => {
  res.render("../views/subpages/buylegends.ejs"); 
});


export default vintageRouter;
