import express from "express"; 
import vintageRouter from "./routes/vintage.js";

const app = express(); 
const port = 3000; 

app.set('view engine', 'ejs');
app.use(express.static("public"));
// this line below will activate bootstrap 
app.use('/node_modules', express.static('node_modules'));

app.get("/", (req, res) => { 
     const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString(); 
    res.render("index.ejs", {currentDate: formattedDate}); 
})

app.use('/vintage', vintageRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
