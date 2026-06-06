require("dotenv").config();

const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const connectionString = process.env.DB_URI

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });


/* Rutina.find({
  dia: "lunes"
})
.then(result => {
  console.log(result);
});  */

/* const rutina = new Rutina({
  dia: "lunes",
  name: "Pullover",
  series: 3,
  reps: 10,
  peso: 60,
});

rutina
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  }); */
