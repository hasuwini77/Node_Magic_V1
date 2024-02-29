import express from "express";
const vintageRouter = express.Router();

   const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 

vintageRouter.use(express.static("public"));
vintageRouter.use('/node_modules', express.static('node_modules'));

vintageRouter.get("/", (req, res) => {
   
    
  res.render("../views/vintage.ejs", {currentDate: formattedDate})
});

vintageRouter.get("/buycheap", (req, res) => {
  res.render("../views/subpages/buycheap.ejs", {currentDate: formattedDate})
});

vintageRouter.get("/buylegends", (req, res) => {
  res.render("../views/subpages/buylegends.ejs", {currentDate: formattedDate}); 
});


export default vintageRouter;
