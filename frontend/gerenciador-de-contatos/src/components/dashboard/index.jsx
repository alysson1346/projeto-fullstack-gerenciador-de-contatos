import "./styles.css";
import { Redirect } from "react-router-dom";
import Api from "../../services";
import { useEffect, useState } from "react";

const Dashboard = ({ authenticad }) => {
  const [name, setName] = useState("Usuário");
  const [contacts, setcontacts] = useState([]);
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  useEffect(() => {
    Api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setName(res.data.name);
        setcontacts(res.data.contacts);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!authenticad) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className="greetingsUser">Seja bem vindo {name}</h1>
      <div className="newContactDiv">
        <p className="newContact">
          Para adicionar um contato basta clicar no botão
        </p>
        <button className="newContactBtn">+</button>
      </div>
      <div className="containerContacts">
        {contacts.map((contact) => {
          return (
            <div className="cardContact">
              <p className="detailsContact">Nome: {contact.name}</p>
              <p className="detailsContact">Email: {contact.email}</p>
              <p className="detailsContact">Contato: {contact.phone}</p>
              <button className="btnContact">Gerenciar Contato</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
