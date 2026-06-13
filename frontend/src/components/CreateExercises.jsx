import { Exercise } from "./Exercise";
import { useState } from "react";
import { Togglable } from "./Togglable";

export const CreateExercise = ({
  addExercise,
  handleEdit,
  handleDelete,
  handleLogout,
  handleDiaChange,
  rutina,
  dia,
}) => {
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const [peso, setPeso] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  // Aca manejo la funcion de agregar el ejercicio
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoEjercicio = {
      name,
      series: Number(series),
      reps: Number(reps),
      peso: Number(peso),
    };
    setName("");
    setSeries("");
    setReps("");
    setPeso("");

    // Le paso el nuevo ejercicio al servicio
    addExercise(nuevoEjercicio);
  };
  return (
    <>
      <Togglable buttonLabel="Agregar Ejercicio">
        <h3>Agregar ejercicio a la rutina:</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ejercicio"
            value={name}
            onChange={(e) => handleChange(e, setName)}
          />

          <input
            type="number"
            placeholder="Series"
            value={series}
            onChange={(e) => handleChange(e, setSeries)}
          />

          <input
            type="number"
            placeholder="Repeticiones"
            value={reps}
            onChange={(e) => handleChange(e, setReps)}
          />

          <input
            type="number"
            placeholder="Peso (kg)"
            value={peso}
            onChange={(e) => handleChange(e, setPeso)}
          />

          <select value={dia} onChange={handleDiaChange}>
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miercoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
            <option value="sabado">Sábado</option>
          </select>

          <button>Agregar</button>
        </form>
      </Togglable>
      <div>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
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
};
