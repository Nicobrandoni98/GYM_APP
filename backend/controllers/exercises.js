const exercisesRouter = require("express").Router();
const Rutina = require("../models/Rutina");
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exercisesRouter.get("/", async (req, res) => {
  // Objengo solo username y name con populate
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
  try {
    const { dia } = req.params;

    const authorization = req.get("authorization");

    let token = null;

    if (
      authorization &&
      authorization.toLowerCase().startsWith("bearer ")
    ) {
      token = authorization.substring(7);
    }

    if (!token) {
      return res.status(401).json({
        error: "Token missing",
      });
    }

    const decodedToken = jwt.verify(
      token,
      // eslint-disable-next-line no-undef
      process.env.SECRET
    );

    if (!decodedToken.id) {
      return res.status(401).json({
        error: "Token invalid",
      });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const { name, series, reps, peso } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "El nombre del ejercicio es obligatorio",
      });
    }

    const ejercicio = new Rutina({
      dia,
      name,
      series,
      reps,
      peso,
      user: user._id,
    });

    const savedExercise = await ejercicio.save();

    user.rutina = user.rutina.concat(savedExercise._id);

    await user.save();

    res.status(201).json(savedExercise);

  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  }
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
