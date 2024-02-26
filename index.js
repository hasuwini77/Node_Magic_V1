import express from "express"; 

const app = express(); 
const port = 3000; 


app.use(express.static("public"));
// this line below will activate bootstrap 
app.use('/node_modules', express.static('node_modules'));

app.get("/", (req, res) => { 
    res.render("index.ejs"); 
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
