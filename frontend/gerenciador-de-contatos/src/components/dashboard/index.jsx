import { Redirect } from "react-router-dom";
import Api from "../../services";
import { useEffect, useState } from "react";

const Dashboard = ({ authenticad }) => {
  const [name, setName] = useState("Usuário");
  const [details, setDetails] = useState([]);
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  useEffect(() => {
    Api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setName(res.data.name);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!authenticad) {
    return <Redirect to="/" />;
  }
  console.log("oiiii");
  console.log(details);

  return (
    <div>
      <h1>Seja bem vindo {name}</h1>
      <p>Para adicionar um contato basta clicar no botão</p>
      <button>Adicionar Contato</button>
    </div>
  );
};

export default Dashboard;
