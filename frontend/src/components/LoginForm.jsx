import { Togglable } from "./Togglable";
export const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <Togglable buttonLabel={'Iniciar sesion'}>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Nombre de usuario"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Contraseña"
              onChange={handlePasswordChange}
            />
          </div>
          <button>Iniciar Sesion</button>
        </form>
      </Togglable>
  );
};
