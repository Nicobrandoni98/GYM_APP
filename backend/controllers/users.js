const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


usersRouter.get("/", async (request, response) => {
  // Obtengo de rutina, solo lo que le pido a traves de populate
  const users = await User.find({}).populate("rutina", {
    name: 1,
    series: 1,
    reps: 1,
    peso: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: "Username already exists",
    });
  }
  // Hassheo el password.
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await user.save();

  response.json(saveUser);
});

module.exports = usersRouter;
