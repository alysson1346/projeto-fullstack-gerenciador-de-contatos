const GreetingUser = ({ name, setModalOpen, setAuthenticad }) => {
  return (
    <>
      <div className="mainMenu">
        <h2 className="greetingsUser">Seja bem vindo {name}</h2>
        <button
          onClick={() => {
            localStorage.clear();
            setAuthenticad(false);
          }}
        >
          Logout
        </button>
      </div>
      <div className="newContactDiv">
        <p className="newContact">
          Para adicionar um contato basta clicar no botão
        </p>
        <button className="newContactBtn" onClick={() => setModalOpen(true)}>
          +
        </button>
      </div>
    </>
  );
};

export default GreetingUser;
