const {Schema, model} = require('mongoose')

const rutinaSchema = new Schema({
  dia: String,
  name: String,
  series: Number,
  reps: Number,
  peso: Number,
});

rutinaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Rutina = model("Rutina", rutinaSchema);

module.exports = Rutina