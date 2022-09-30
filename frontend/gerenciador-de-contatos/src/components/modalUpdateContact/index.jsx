import { Modal } from "@react-ui-org/react-ui";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services";

const ModalUpdateContact = ({
  detailscontact,
  setDetailscontact,
  setUpdatecontact,
  idcontact,
  token,
}) => {
  const modalPrimaryButtonRef = useRef();
  const modalCloseButtonRef = useRef();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    phone: Yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const updateAccount = (id, data) => {
    Api.patch(`contact/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return (
          toast.success("Atualizado com sucesso", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }) && setUpdatecontact(false)
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
  const updateSubmit = (data) => {
    updateAccount(idcontact, data);
  };

  return (
    <>
      <Modal
        closeButtonRef={modalCloseButtonRef}
        primaryButtonRef={modalPrimaryButtonRef}
      >
        <form className="modalAddContact" onSubmit={handleSubmit(updateSubmit)}>
          <div className="closeModalBtnAddContact">
            <button
              className="btnXcloseModal"
              onClick={() => setUpdatecontact(false)}
            >
              x
            </button>
          </div>
          <h2 className="subtitleModal">Edite aqui o contato</h2>

          <label className="labelModal">Name:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o nome"
            {...register("name")}
            value={detailscontact.name}
            onChange={(e) => setDetailscontact({ name: e.target.value })}
          />
          <span className="errorsYupModal">{errors.name?.message}</span>

          <label className="labelModal">E-mail:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o e-mail"
            {...register("email")}
            value={detailscontact.email}
            onChange={(e) => setDetailscontact({ email: e.target.value })}
          />
          <span className="errorsYupModal">{errors.email?.message}</span>

          <label className="labelModal">Phone:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o phone"
            {...register("phone")}
            value={detailscontact.phone}
            onChange={(e) => setDetailscontact({ phone: e.target.value })}
          />
          <span className="errorsYupModal">{errors.name?.message}</span>

          <div className="btnCentralization">
            <button className="buttonSave" type="submit">
              Atualizar
            </button>
          </div>
        </form>
        <ToastContainer />
      </Modal>
    </>
  );
};
export default ModalUpdateContact;
