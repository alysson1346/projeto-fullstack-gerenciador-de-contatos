import "./styles.css";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import ModalCreateContact from "../modalCreateContact";
import ModalUpdateContact from "../modalUpdateContact";
import GreetingUser from "../greetingUser";
import CardContacts from "../cardContacts";
import Api from "../../services";

const Dashboard = ({ authenticad, setAuthenticad }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updatecontact, setUpdatecontact] = useState(false);
  const [name, setName] = useState("Usuário");
  const [idcontact, setIdcontact] = useState("id");
  const [detailscontact, setDetailscontact] = useState({});
  const [contacts, setcontacts] = useState([]);
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  useEffect(() => {
    Api.get("users/me", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setName(res.data.name);
        setcontacts(res.data.contacts);
      })
      .catch((err) => console.log(err));
  }, [contacts]);

  if (!authenticad) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GreetingUser
        name={name}
        setModalOpen={setModalOpen}
        setAuthenticad={setAuthenticad}
      />
      <div>
        {modalOpen && (
          <ModalCreateContact setModalOpen={setModalOpen} token={token} />
        )}
      </div>

      <div>
        {updatecontact && (
          <ModalUpdateContact
            detailscontact={detailscontact}
            setDetailscontact={setDetailscontact}
            setUpdatecontact={setUpdatecontact}
            idcontact={idcontact}
            token={token}
          />
        )}
      </div>
      <div className="containerContacts">
        <CardContacts
          contacts={contacts}
          setIdcontact={setIdcontact}
          setDetailscontact={setDetailscontact}
          setUpdatecontact={setUpdatecontact}
          setModalOpen={setModalOpen}
          token={token}
        />
      </div>
    </div>
  );
};

export default Dashboard;
