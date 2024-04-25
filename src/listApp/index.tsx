import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_APP_REACT_URL, getItem } from "../helpers";
import { DataAppInterFace, ModalOption } from "../interFace";
import Modalkonfirmasi from "./modalkonfirmasi";

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

  const [listApp, setlistApp] = useState<DataAppInterFace[]>([]);
  const [dataTmp, setDataTmp] = useState<DataAppInterFace[]>([]);

  const getDataListApp = async () => {
    try {
      const response = await Axios.get(VITE_APP_REACT_URL + "/app");
      setlistApp(response.data.names);
      setDataTmp(response.data.names);
    } catch (error) {
      setlistApp([]);
      console.log(error);
    }
  };

  const [modal, setModal] = useState<ModalOption>({
    title: "",
    isOpen: false,
    is_branch_avail: false
  });

  const detailApp = (list: DataAppInterFace) => {
    setModal({
      title: list.name,
      isOpen: true,
      is_branch_avail: list.is_branch_avail
    });
    // navigate("/detail/" + list);
  };

  const filterApp = (value: string) => {
    const regex = new RegExp(`${value}`, "i");
    if (value === "") {
      setDataTmp(listApp);
    } else {
      const result = listApp.filter((list) => regex.test(list.name));
      setDataTmp(result);
    }
  };
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  const goToGitLog = (row: DataAppInterFace) => {
    const queryString = `?id=${row.name}`;
    navigate(`/log${queryString}`);
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
              <p>{item.name}</p>
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
                  Update App
                </button>
                <button
                  onClick={() => goToGitLog(item)}
                  className="bg-[#304cba] w-full rounded text-white"
                >
                  {" "}
                  Git Log{" "}
                </button>

                <a
                  href={item.link_qc}
                  target="_blank"
                  className="bg-[#41B06E] w-full rounded flex justify-center text-white"
                >
                  {" "}
                  Link Qc{" "}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal.isOpen && (
        <Modalkonfirmasi modal={modal} setModal={(data) => setModal(data)} />
      )}
    </div>
  );
};

export default ListApp;
