require("dotenv").config();

console.log(process.env.SUPABASE_URL);

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server online!');
});

const rotas = require("./rotas");
app.use(rotas);

app.listen(3000, () => {
    console.log('porta 3000 funcionando');
});