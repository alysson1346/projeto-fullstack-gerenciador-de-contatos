import "./styles.css";
import Api from "../../services/index.js";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = ({ authenticad }) => {
  const history = useHistory();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    phone: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
    passworConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Senhas devem ser iguais")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    console.log(data);
    Api.post("users/", data)
      .then((res) => {
        return (
          toast.success("Conta criada com sucesso", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }) &&
          setTimeout(() => {
            history.push("/");
          }, 2000)
        );
      })
      .catch((err) => {
        console.log(err);
        return toast.error("Algo deu errado!", {
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
        <h1 className="mainTitle">Crie sua conta</h1>
        <p className="loginSubtitle">
          Crie sua conta grátis e gerencie seus contatos!
        </p>
        <label className="labelsForm">Name:</label>
        <input
          className="inputsForm"
          placeholder="Digite aqui seu nome completo"
          {...register("name")}
        />
        <span className="errorsYup">{errors.name?.message}</span>

        <label className="labelsForm">E-mail:</label>
        <input
          className="inputsForm"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        <span className="errorsYup">{errors.email?.message}</span>

        <label className="labelsForm">Contato:</label>
        <input
          className="inputsForm"
          placeholder="Digite aqui seu contato"
          {...register("phone")}
        />
        <span className="errorsYup">{errors.phone?.message}</span>

        <label className="labelsForm">Senha:</label>
        <input
          type={"password"}
          className="inputsForm"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <span className="errorsYup">{errors.password?.message}</span>

        <label className="labelsForm">Confirmar Senha:</label>
        <input
          type={"password"}
          className="inputsForm"
          placeholder="Confirme aqui sua senha"
          {...register("passworConfirm")}
        />
        <span className="errorsYup">{errors.passworConfirm?.message}</span>

        <button className="btnLogin" type="submit">
          Login
        </button>
        <h3 className="createAccountSubtitle">Já possui uma conta?</h3>
        <button className="registerHere" onClick={() => history.push("/")}>
          Clique aqui para fazer o Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAccount;
