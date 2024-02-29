import express from "express";
const modernRouter = express.Router();

modernRouter.use(express.static("public"));
modernRouter.use('/node_modules', express.static('node_modules'));

modernRouter.get("/", (req, res) => {
      const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 
    
  res.render("../views/modern.ejs", {currentDate: formattedDate})
});

modernRouter.get("/buycheap", (req, res) => {
  res.render("../views/subpages/buycheap.ejs")
});

modernRouter.get("/buylegends", (req, res) => {
  res.render("../views/subpages/buylegends.ejs"); 
});


export default modernRouter;
