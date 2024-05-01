const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./contador");
const libroSchema = new Schema({
  _id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published_year: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
});

libroSchema.pre("save", async function (next) {
  try {
    if (!this._id) {
      const contador = await Counter.findByIdAndUpdate(
        "libros",
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this._id = `libro_${contador.seq}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Libro = mongoose.model("Libros", libroSchema);

module.exports = Libro;
