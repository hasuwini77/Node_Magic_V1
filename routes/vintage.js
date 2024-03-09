import express from "express";
import axios from "axios"
const vintageRouter = express.Router();

const currentYear = new Date().getFullYear(); 
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

// Shuffle the array of filtered cards
    const shuffledCards = filteredCards.sort(() => Math.random() - 0.5);

    // Limit the number of cards to 12
    const slicedCards = shuffledCards.slice(0, 12);


    res.render("../views/vintage.ejs", { currentDate: formattedDate, data: slicedCards , getYear: currentYear});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("../views/vintage.ejs", { currentDate: formattedDate, error: error.message , getYear: currentYear});
  }
});


vintageRouter.get("/buycheap", async (req, res) => {
  try {
      // Searching within the whole magic database and getting cards under 1 dollar with 80 results 
    const response = await axios.get("https://api.scryfall.com/cards/search?q=usd<1&page=1&per_page=80");
      const allCards = response.data.data; 
      
    const filteredCards = allCards
      .filter(card => card.type_line.toLowerCase().includes("land") === false) // Exclude lands
      .filter(card => card.image_uris && card.image_uris.normal) // Exclude cards without images
      .filter(card => card.prices && card.prices.usd && card.prices.usd !== 0); // Exclude cards with undefined or 0 price
    
  // Shuffle the array of filtered cards
  const shuffledCards = filteredCards.sort(() => Math.random() - 0.5);

  // Limit the number of cards to 6
  const slicedCards = shuffledCards.slice(0, 6);

    res.render("../views/subpages/cheaporlegends.ejs", { currentDate: formattedDate, data: slicedCards ,  price:
      'cheap', getYear: currentYear} );
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("../views/subpages/cheaporlegends.ejs", { currentDate: formattedDate, error: error.message ,  price:
      'cheap', getYear: currentYear});
  }

});

vintageRouter.get("/buylegends", async (req, res) => {
try {
      // Searching within the whole magic database and getting cards over 100 dollar with 80 results 
const response = await axios.get("https://api.scryfall.com/cards/search?q=usd>100&page=1&per_page=80");
      const allCards = response.data.data; 
      
    const filteredCards = allCards
      .filter(card => card.image_uris && card.image_uris.normal) // Exclude cards without images
      .filter(card => card.prices && card.prices.usd && card.prices.usd !== 0); // Exclude cards with undefined or 0 price
    
  // Shuffle the array of filtered cards
  const shuffledCards = filteredCards.sort(() => Math.random() - 0.5);

  // Limit the number of cards to 6
  const slicedCards = shuffledCards.slice(0, 6);

    res.render("../views/subpages/cheaporlegends.ejs", { currentDate: formattedDate, data: slicedCards ,  price:
      'expensive', getYear: currentYear} );
  } catch (error) {
  console.error("Failed to make request:", error.message);
  
    res.render("../views/subpages/cheaporlegends.ejs", { currentDate: formattedDate, error: error.message ,  price:
      'expensive', getYear: currentYear});
  }
});


export default vintageRouter;
