import express from "express";
import axios from "axios"
const modernRouter = express.Router();

   const currentDate = new Date();
const formattedDate = currentDate.toLocaleString(); 
    
modernRouter.use(express.static("public"));
modernRouter.use('/node_modules', express.static('node_modules'));

modernRouter.get("/", async (req, res) => {
      try {
      // Searching within the Murders at Karlov Manor (MKM) - new set / still isolating page 1 with 80 results 
    const response = await axios.get("https://api.scryfall.com/cards/search?q=set:mkm&page=1&per_page=80");
      const allCards = response.data.data; 
      
    const filteredCards = allCards
      .filter(card => card.type_line.toLowerCase().includes("land") === false) // Exclude lands
      .filter(card => card.image_uris && card.image_uris.normal); // Exclude cards without images

// Shuffle the array of filtered cards
    const shuffledCards = filteredCards.sort(() => Math.random() - 0.5);

    // Limit the number of cards to 12
    const slicedCards = shuffledCards.slice(0, 12);


    res.render("../views/modern.ejs", { currentDate: formattedDate, data: slicedCards });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("../views/modern.ejs", { currentDate: formattedDate, error: error.message });
  }
});

modernRouter.get("/commander", (req, res) => {
  res.render("../views/subpages/commander.ejs", {currentDate: formattedDate})
});

modernRouter.get("/newsets", (req, res) => {
  res.render("../views/subpages/newsets.ejs", {currentDate: formattedDate}); 
});


export default modernRouter;
