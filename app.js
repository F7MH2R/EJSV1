const express = require("express");
const moongose = require("mongoose");
const app = express();
const port = 3000;
const router = require("./router/router");

//Configurar la base de datos
const url = "mongodb://localhost:27017/Biblioteca";
moongose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se conecto Correctamente");
  })
  .catch((error) => {
    console.error("Error al conectar la Base de datos");
  });

app.set("view engine", "ejs");
app.set("views", "./views");

//Middleware para formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//mandar a llamar los router

app.use(router);
//Escucha del Puerto
app.listen(port, () => {
  console.log(`Puerto ${port}`);
});
