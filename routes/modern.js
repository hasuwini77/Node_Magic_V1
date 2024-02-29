import express from "express";
const modernRouter = express.Router();

   const currentDate = new Date();
const formattedDate = currentDate.toLocaleString(); 
    
modernRouter.use(express.static("public"));
modernRouter.use('/node_modules', express.static('node_modules'));

modernRouter.get("/", (req, res) => {
      
  res.render("../views/modern.ejs", {currentDate: formattedDate})
});

modernRouter.get("/commander", (req, res) => {
  res.render("../views/subpages/commander.ejs", {currentDate: formattedDate})
});

modernRouter.get("/newsets", (req, res) => {
  res.render("../views/subpages/newsets.ejs", {currentDate: formattedDate}); 
});


export default modernRouter;
