// import { ReactTerminal } from "react-terminal";

import Axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_APP_REACT_URL, getItem } from "../helpers";

const ListApp = () => {
  useEffect(() => {
    getDataListApp();
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getItem("isLogin");
    if (data) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [listApp, setlistApp] = useState<string[]>([]);
  const [dataTmp, setDataTmp] = useState<string[]>([]);

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
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
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
        {dataTmp.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full p-2 border-2 rounded cursor-pointer"
            >
              <p>{item}</p>
              {openIndex === index ? (
                <i className="fa-solid fa-circle-chevron-down text-[#141E46]"></i>
              ) : (
                <i className="fa-solid fa-circle-chevron-right text-[#141E46]"></i>
              )}
            </div>
            {openIndex === index && (
              <div className="flex gap-2 p-2 border border-gray-200 rounded h-30">
                <button
                  onClick={() => detailApp(item)}
                  className="bg-[#141E46] w-full rounded text-white"
                >
                  {" "}
                  Update{" "}
                </button>

                <button className="bg-[#41B06E] w-full rounded  text-white">
                  {" "}
                  Link Qc{" "}
                </button>
              </div>
            )}
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
