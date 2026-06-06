export const Exercise = ({ exercise, onEdit, onDelete }) => {
  return (
    <li>
      <strong>{exercise.name}</strong>
      <br />
      Series: {exercise.series}
      <br />
      Reps: {exercise.reps}
      <br />
      Peso: {exercise.peso} kg
      <br />
      <button onClick={() => onEdit(exercise)}>Editar</button>
      <button onClick={() => onDelete(exercise.id)}>Eliminar</button>
    </li>
  );
};

export default Exercise;
