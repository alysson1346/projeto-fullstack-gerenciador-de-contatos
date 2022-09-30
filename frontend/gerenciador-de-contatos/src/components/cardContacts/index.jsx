import Api from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardContacts = ({
  contacts,
  setIdcontact,
  setDetailscontact,
  setUpdatecontact,
  setModalOpen,
  token,
}) => {
  const deleteAccount = (id) => {
    Api.delete(`contact/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return (
          toast.success("Deletado com sucesso", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }) && setModalOpen(false)
        );
      })
      .catch((err) => {
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

  return (
    <>
      {contacts.map((contact) => {
        return (
          <div className="cardContact" key={contact.id}>
            <p className="detailsContact">{contact.name}</p>
            <p className="detailsContact">{contact.email}</p>
            <p className="detailsContact">{contact.phone}</p>
            <div className="divBtnCardContact">
              <button
                className="btnContactManage"
                onClick={() => {
                  setIdcontact(contact.id);
                  setDetailscontact(contact);
                  setUpdatecontact(true);
                }}
              >
                Editar
              </button>
              <button
                className="btnContactExclude"
                onClick={() => deleteAccount(contact.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        );
      })}
      <ToastContainer />
    </>
  );
};

export default CardContacts;
