//import ControlledComponet from "./components/controlled-components/ControlledComponent";
//import ControlledComponentAllFormData from "./components/controlled-components/ControlledComponentAllFormData.jsx";
//import UncontrolledComponent from "./components/uncontrolled-components/UncontrolledComponent.jsx";
import YoutubeFrom from "./components/react-hook-form/YoutubeForm";
import { getAllData } from "./services/get";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [errormsg, setErrorMsg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setUsers(data);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };
    load();
  }, []);

  return (
    <>
      {errormsg && <p>{errormsg}</p>}
      {/* <ControledComponent /> */}
      {/* <ControlledComponentAllFormData />; */}
      {/* <UncontrolledComponent /> */}
      <YoutubeFrom />
      <UsersList users={users} />
      {isLoading && <BeatLoader color="#36d7b7" />}
    </>
  );
}

export default App;
