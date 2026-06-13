import { useEffect, useState } from "react";
import {
  getAllExercises,
  createExercise,
  deleteExercise,
  updateExercise,
  setToken,
} from "./services/exercises";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import { CreateExercise } from "./components/CreateExercises";

function App() {
  const [rutina, setRutina] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  });

  
  const [dia, setDia] = useState("lunes");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user);
      setToken(user.token);
    }
  }, []);

  // Dejo el servicio para crear ejercicio
  const addExercise = (nuevoEjercicio) => {
    createExercise(dia, nuevoEjercicio).then((ejercicioCreado) => {
      setRutina((prev) => ({
        ...prev,
        [dia]: [...prev[dia], ejercicioCreado],
      }));
    })
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(user.token);
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <>
      <h1>Mi rutina</h1>
      {user ? (
        <CreateExercise
          addExercise={addExercise}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleLogout={handleLogout}
          handleDiaChange={(e) => setDia(e.target.value)}
          dia={dia}
          rutina={rutina}
        />
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(event) => setUsername(event.target.value)}
          handlePasswordChange={(event) => setPassword(event.target.value)}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
