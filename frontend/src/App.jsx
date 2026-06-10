import { useEffect, useState } from "react";
import { Exercise } from "./components/Exercise";
import {
  getAllExercises,
  createExercise,
  deleteExercise,
  updateExercise,
} from "./services/exercises";
function App() {
  const [rutina, setRutina] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  });

  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const [peso, setPeso] = useState("");
  const [dia, setDia] = useState("lunes");

  useEffect(() => {
    getAllExercises().then((data) => {
      const rutinaAgrupada = {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
      };

      data.forEach((ejercicio) => {
        console.log("DIA:", ejercicio.dia);
        rutinaAgrupada[ejercicio.dia].push(ejercicio);
      });

      setRutina(rutinaAgrupada);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoEjercicio = {
      name,
      series: Number(series),
      reps: Number(reps),
      peso: Number(peso),
    };

    createExercise(dia, nuevoEjercicio).then((ejercicioCreado) => {
      setRutina((prev) => ({
        ...prev,
        [dia]: [...prev[dia], ejercicioCreado],
      }));
    });

    setName("");
    setSeries("");
    setReps("");
    setPeso("");
  };

  const handleDelete = (dia, id) => {
    deleteExercise(id).then(() => {
      setRutina((prev) => ({
        ...prev,
        [dia]: prev[dia].filter((exercise) => exercise.id !== id),
      }));
    });
  };

  const handleEdit = (dia, exercise) => {
    const nuevoNombre = prompt("Nombre", exercise.name);

    const nuevasSeries = prompt("Series", exercise.series);

    const nuevasReps = prompt("Repeticiones", exercise.reps);

    const nuevoPeso = prompt("Peso", exercise.peso);

    if (!nuevoNombre || !nuevasSeries || !nuevasReps || !nuevoPeso) {
      return;
    }

    const ejercicioActualizado = {
      name: nuevoNombre,
      series: Number(nuevasSeries),
      reps: Number(nuevasReps),
      peso: Number(nuevoPeso),
    };

    updateExercise(exercise.id, ejercicioActualizado).then((updated) => {
      setRutina((prev) => ({
        ...prev,
        [dia]: prev[dia].map((e) => (e.id === updated.id ? updated : e)),
      }));
    });
  };

  return (
    <>
      <h1>Mi rutina</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ejercicio"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Series"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />

        <input
          type="number"
          placeholder="Repeticiones"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        <select value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="lunes">Lunes</option>
          <option value="martes">Martes</option>
          <option value="miercoles">Miércoles</option>
          <option value="jueves">Jueves</option>
          <option value="viernes">Viernes</option>
          <option value="sabado">Sábado</option>
        </select>

        <button>Agregar</button>
      </form>

      {Object.entries(rutina).map(([dia, ejercicios]) => (
        <div key={dia}>
          <h2>{dia}</h2>

          <ul>
            {ejercicios.map((exercise) => (
              <Exercise
                key={exercise.id}
                exercise={exercise}
                onDelete={(id) => handleDelete(dia, id)}
                onEdit={(exercise) => handleEdit(dia, exercise)}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default App;
