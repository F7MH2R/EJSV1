const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema para el contador
const counterSchema = Schema({
  _id: String,
  seq: {
    type: Number,
    required: true,
  },
});

//Crer modulo y exportar
const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
