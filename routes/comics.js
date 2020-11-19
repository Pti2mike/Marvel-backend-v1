const express = require("express");
const router = express.Router();

const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
require("dotenv").config();

// On récupère les clés fournies par l'API à l'inscription, puis on les masque

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

// Création de la route GET comics

// apikey écessaire pour accéder au serveur distant API Marvel à chaque req

router.get("/comics", async (req, res) => {
  try {
    // on crée le ts requis
    // défnition de la variable ts avec le package uid2
    const ts = uid2(6);

    // définition de la variable hash avec le package md5
    // pré-requis de l'API md5(ts+privateKey+publicKey)
    const hash = md5(ts + privateKey + publicKey);

    // création de la requete vers l'API Marvel
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
