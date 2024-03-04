import express from "express";
import axios from "axios"
const vintageRouter = express.Router();

   const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 

vintageRouter.use(express.static("public"));
vintageRouter.use('/node_modules', express.static('node_modules'));

vintageRouter.get("/", async (req, res) => {
    try {
      // Searching within the Alpha Set "lea" and isolating page 1 with 80 results 
    const response = await axios.get("https://api.scryfall.com/cards/search?q=set:lea&page=1&per_page=80");
      const allCards = response.data.data; 
      
    const filteredCards = allCards
      .filter(card => card.type_line.toLowerCase().includes("land") === false) // Exclude lands
      .filter(card => card.image_uris && card.image_uris.normal); // Exclude cards without images

    // Limit the number of cards to 10
    const slicedCards = filteredCards.slice(0, 12);

    res.render("../views/vintage.ejs", { currentDate: formattedDate, data: slicedCards });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("../views/vintage.ejs", { currentDate: formattedDate, error: error.message });
  }
});


vintageRouter.get("/buycheap", (req, res) => {
  res.render("../views/subpages/buycheap.ejs", {currentDate: formattedDate})
});

vintageRouter.get("/buylegends", (req, res) => {
  res.render("../views/subpages/buylegends.ejs", {currentDate: formattedDate}); 
});


export default vintageRouter;
