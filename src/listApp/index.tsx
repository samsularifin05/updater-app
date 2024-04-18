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
  const [dataTmp, setDataTmp] = useState<string[]>([]);
  const navigate = useNavigate();

  const getDataListApp = async () => {
    try {
      const response = await Axios.get(VITE_APP_REACT_URL + "/app");
      setlistApp(response.data.names);
      setDataTmp(response.data.names);
    } catch (error) {
      setlistApp(["Nagagold", "GK"]);
      console.log(error);
    }
  };

  const [modal, setModal] = useState({
    title: "",
    isOpen: false
  });

  const detailApp = (list: string) => {
    setModal({
      title: list,
      isOpen: true
    });
    // navigate("/detail/" + list);
  };

  const filterApp = (value: string) => {
    const regex = new RegExp(`${value}`, "i");
    if (value === "") {
      setDataTmp(listApp);
    } else {
      const result = listApp.filter((list) => regex.test(list));
      setDataTmp(result);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1> List App </h1>
      <input
        className="outline-none border-2 p-1 rounded-full px-4 border-gray-300  focus:border-[#178DF9]"
        placeholder="Cari App"
        onChange={(e) => filterApp(e.target.value)}
      />

      <div className="flex flex-col gap-3 mt-4">
        {dataTmp.map((list, index) => (
          <div
            key={index}
            onClick={() => detailApp(list)}
            className="flex w-full border-2 rounded p-2 hover:border-[#178DF9] cursor-pointer"
          >
            {list}
          </div>
        ))}
      </div>
      {modal.isOpen && (
        <div
          className={`fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center ${
            modal.isOpen ? "" : "hidden"
          }`}
        >
          {/* Konten modal */}
          <div className="relative max-w-md p-8 m-4 bg-white rounded-md w-80">
            {/* Pesan konfirmasi */}
            <div className="mb-4 text-xl font-bold">
              Apakah anda yakin ingin update {modal.title} ?
            </div>
            {/* Tombol untuk mengonfirmasi atau membatalkan */}
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setModal({
                    title: "",
                    isOpen: false
                  })
                }
                className="px-4 py-2 mr-2 font-bold text-white bg-[#ee6e6e] rounded hover:bg-[#a53636]"
              >
                No
              </button>
              <button
                onClick={() => {
                  navigate("/detail/" + modal.title);
                }}
                className="px-4 py-2 font-bold text-white bg-[#78b7f1] rounded hover:bg-[#178DF9]"
              >
                Yes
              </button>
            </div>
          </div>
          {/* Tombol untuk menutup modal */}
          <button
            onClick={() => {
              setModal({
                title: "",
                isOpen: false
              });
            }}
            className="absolute top-0 right-0 p-2"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ListApp;
