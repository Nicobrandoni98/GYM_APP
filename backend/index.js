require("dotenv").config();
require("./mongo.js");

const exercisesRouter = require('./controllers/exercises.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Uso de app.use para manejar las rutas
app.use("/api/exercises", exercisesRouter)
app.use("/api/exercises/:dia", exercisesRouter)
app.use("/api/exercises/:dia", exercisesRouter);
app.use("/api/exercises/:id", exercisesRouter);
app.use("/api/exercises/:id", exercisesRouter);

app.use('/api/users', usersRouter)
app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)


const PORT = 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${process.env.PORT}`);
});
