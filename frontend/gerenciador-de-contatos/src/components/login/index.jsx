import "./styles.css";
import Api from "../../services/index.js";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ authenticad, setAuthenticad }) => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    console.log(data);
    Api.post("users/login", data)
      .then((res) => {
        const token = JSON.stringify(res.data.token);
        localStorage.setItem("@UserAuthorization:token", token);
        setAuthenticad(true);
        return history.push("/dashboard");
      })
      .catch((err) => {
        return toast.error("E-mail ou senha inválidos", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  if (authenticad) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="centralizeForm">
      <form className="formBox" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mainTitle">Login</h1>
        <p className="loginSubtitle">Faça o login com suas credenciais</p>
        <label className="labelsForm">E-mail:</label>
        <input
          className="inputsForm"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        <span className="errorsYup">{errors.email?.message}</span>

        <label className="labelsForm">Senha:</label>
        <input
          type={"password"}
          className="inputsForm"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <span className="errorsYup">{errors.password?.message}</span>

        <button className="btnLogin" type="submit">
          Login
        </button>
        <h3 className="createAccountSubtitle">Ainda não possui uma conta?</h3>
        <button
          className="registerHere"
          onClick={() => history.push("/create-account")}
        >
          cadastre-se aqui
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
