const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Carica lo stato iniziale dei numeri
let numbers = JSON.parse(fs.readFileSync("numbers.json", "utf8"));

// API per ottenere lo stato dei numeri
app.get("/api/numbers", (req, res) => {
    res.json(numbers);
});

// API per bloccare un numero
app.post("/api/block", (req, res) => {
    const { number } = req.body;
    const selectedNumber = numbers.find(n => n.number === number);

    if (!selectedNumber || !selectedNumber.available) {
        return res.status(400).json({ message: "Numero non disponibile" });
    }

    // Blocca il numero
    selectedNumber.available = false;
    fs.writeFileSync("numbers.json", JSON.stringify(numbers, null, 2));
    res.json({ message: "Numero bloccato con successo" });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});