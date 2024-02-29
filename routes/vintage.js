import express from "express";
const vintageRouter = express.Router();

vintageRouter.use(express.static("public"));
vintageRouter.use('/node_modules', express.static('node_modules'));

vintageRouter.get("/", (req, res) => {
      const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 
    
  res.render("../views/vintage.ejs", {currentDate: formattedDate})
});

vintageRouter.get("/buycheap", (req, res) => {
  res.render("../views/subpages/buycheap.ejs")
});

vintageRouter.get("/buylegends", (req, res) => {
  res.render("../views/subpages/buylegends.ejs"); 
});


export default vintageRouter;
