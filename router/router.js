const express = require("express");
const moongose = require("mongoose");
const app = express();
const router = express.Router();
const Libro = require("../schema/Libro");
const ObjectId = moongose.Types.ObjectId;

app.set("view engine", "ejs");
app.set("views", "../views");

//  Obtener todos los libros al index
router.get("/", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.render("index", { libros }); //La matriz de libros a index
  } catch (error) {
    console.error("Error al obtener libros: ", error);
    res.status(500).send("Error al obtener libros");
  }
});

//Rendizar Crear
router.get("/libros/create", (req, res) => {
  res.render("create_books");
});

//Añadir un nuevo libro
router.post("/Libros", async (req, res) => {
  try {
    const nuevoLibro = new Libro({
      title: req.body.title,
      author: req.body.author,
      published_year: req.body.published_year,
      image_url: req.body.image_url,
      genre: req.body.genre,
    });
    console.log(Libro);
    await nuevoLibro.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear libro");
  }
});

module.exports = router;
