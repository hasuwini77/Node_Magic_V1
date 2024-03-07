import express from "express"; 
import vintageRouter from "./routes/vintage.js";
import modernRouter from "./routes/modern.js";
import axios from "axios";

const app = express(); 
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(express.static("public"));
// this line below will activate bootstrap 
app.use('/node_modules', express.static('node_modules'));

app.get("/", async (req, res) => { 
     const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString(); 
  // Adding an API logic to create a fun random card using Scryfall 
  try {
    // Searching for a Random Magic Card 
    const response = await axios.get("https://api.scryfall.com/cards/random");
    const randomCard = response.data;

    console.log(randomCard);
    res.render("index.ejs", { currentDate: formattedDate, data: randomCard });
  } catch (error) {
    console.error("Failed to make request:", error.message);

    res.render("index.ejs", { currentDate: formattedDate, error: error.message });
  }
});

app.use('/vintage', vintageRouter);
app.use('/modern', modernRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
