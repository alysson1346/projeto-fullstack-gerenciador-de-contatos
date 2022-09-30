import { Modal } from "@react-ui-org/react-ui";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services";

const ModalCreateContact = ({ setModalOpen, token }) => {
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

  const onSubmit = (data) => {
    Api.post("contact", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return (
          toast.success("Contato criado com sucesso", {
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
      <Modal
        closeButtonRef={modalCloseButtonRef}
        primaryButtonRef={modalPrimaryButtonRef}
      >
        <form className="modalAddContact" onSubmit={handleSubmit(onSubmit)}>
          <div className="closeModalBtnAddContact">
            <button
              className="btnXcloseModal"
              onClick={() => setModalOpen(false)}
            >
              x
            </button>
          </div>
          <h2 className="subtitleModal">
            Preenchas os campos abaixo para <br /> adicionar um novo contato
          </h2>

          <label className="labelModal">Name:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o nome"
            {...register("name")}
          />
          <span className="errorsYupModal">{errors.name?.message}</span>

          <label className="labelModal">E-mail:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o e-mail"
            {...register("email")}
          />
          <span className="errorsYupModal">{errors.email?.message}</span>

          <label className="labelModal">Phone:</label>
          <input
            className="inputModalContact"
            placeholder="Digite aqui o phone"
            {...register("phone")}
          />
          <span className="errorsYupModal">{errors.phone?.message}</span>

          <div className="btnCentralization">
            <button className="buttonSave" type="submit">
              Salvar
            </button>
            <button
              className="buttonCancel"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalCreateContact;
