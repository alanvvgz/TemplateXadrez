const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://alanvitor57ntc:alangg@cluster0.kybsno7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
