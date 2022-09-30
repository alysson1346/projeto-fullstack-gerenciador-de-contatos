import Dashboard from "../../components/dashboard";

const PageDashboard = ({ authenticad, setAuthenticad }) => {
  return (
    <>
      <Dashboard authenticad={authenticad} setAuthenticad={setAuthenticad} />
    </>
  );
};

export default PageDashboard;
