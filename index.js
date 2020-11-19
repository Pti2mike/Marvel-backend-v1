const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

// On récupère les clés fournies par l'API à l'inscription, puis on les masque

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

// Import des routes
const characters = require("./routes/characters");
app.use(characters);

const comics = require("./routes/comics");
app.use(comics);

app.all("*", (req, res) => {
  res.status(400).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
