const exercisesRouter = require("express").Router();
const Rutina = require("../models/Rutina");
const User = require('../models/User')

exercisesRouter.get("/", async (req, res) => {
  const ejercicios = await Rutina.find({}).populate('user',{
    username: 1,
    name: 1
  });

  res.json(ejercicios);
});

exercisesRouter.get("/:dia", async (req, res) => {
  const { dia } = req.params;

  const ejercicios = await Rutina.find({
    dia: dia,
  });

  res.json(ejercicios);
});

exercisesRouter.post("/:dia", async (req, res) => {
  
  const { dia } = req.params;

  const user = await User.findById(req.body.user)

  if (!user) {
    return res.status(400).json({
      error: "Usuario no encontrado o no enviado"
    });
  }
 
  const ejercicio = new Rutina({
    dia,

    name: req.body.name,

    series: req.body.series,

    reps: req.body.reps,

    peso: req.body.peso,

    user: user._id
  });

  const saved = await ejercicio.save();

  user.rutina = user.rutina.concat(saved._id)
  await user.save()

  res.json(saved);
});

exercisesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Rutina.findByIdAndDelete(id);

  res.status(204).end();
});

exercisesRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  const ejercicioActualizado = await Rutina.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });

  res.json(ejercicioActualizado);
});

module.exports = exercisesRouter;
