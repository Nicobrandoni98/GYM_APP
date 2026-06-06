require('dotenv').config()
require('./mongo.js')

const Rutina = require('./models/Rutina.js')
const express = require("express");
const cors = require("cors");
const app = express()

app.use(cors());
app.use(express.json());


app.get("/api/exercises", async (req, res) => {
  const ejercicios = await Rutina.find({});

  res.json(ejercicios);
});

app.get("/api/exercises/:dia", async (req, res) => {
  const {dia} = req.params;

  const ejercicios = await Rutina.find({
    dia: dia
  });

  res.json(ejercicios);
});

app.post("/api/exercises/:dia", async (req, res) => {
  const {dia} = req.params;

  const ejercicio = new Rutina({
    dia,

    name: req.body.name,

    series: req.body.series,

    reps: req.body.reps,

    peso: req.body.peso
  });

  const saved = await ejercicio.save();

  res.json(saved);
});

app.delete("/api/exercises/:id", async (req, res) => {
  const id = req.params.id;

  await Rutina.findByIdAndDelete(id);

  res.status(204).end();
});

app.put("/api/exercises/:id", async (req, res) => {
  const id = req.params.id;

  const ejercicioActualizado =
    await Rutina.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true
      }
    );

  res.json(ejercicioActualizado);
});

const PORT = 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${process.env.PORT}`);
});
