import Login from "../../components/login";

function PageLogin({ authenticad, setAuthenticad }) {
  return (
    <>
      <Login authenticad={authenticad} setAuthenticad={setAuthenticad} />
    </>
  );
}

export default PageLogin;
