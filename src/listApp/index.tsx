// import { ReactTerminal } from "react-terminal";

import Axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_APP_REACT_URL } from "../helpers";

const ListApp = () => {
  useEffect(() => {
    getDataListApp();
  }, []);

  const [listApp, setlistApp] = useState<string[]>([]);
  const navigate = useNavigate();

  const getDataListApp = async () => {
    try {
      const response = await Axios.get(VITE_APP_REACT_URL + "/app");
      setlistApp(response.data.names);
    } catch (error) {
      setlistApp(["Nagagold", "GK"]);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1> List App </h1>
      <input
        className="outline-none border-2 p-1 rounded-full px-4 border-gray-300  focus:border-[#178DF9]"
        placeholder="Cari App"
      />

      <div className="flex mt-4 flex-col gap-3">
        {listApp.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate("/detail/" + list)}
            className="flex w-full border-2 rounded p-2 hover:border-[#178DF9] cursor-pointer"
          >
            {list}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListApp;
