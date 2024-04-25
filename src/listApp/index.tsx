import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_APP_REACT_URL, getItem } from "../helpers";
import { DataAppInterFace, ModalOption } from "../interFace";
import Modalkonfirmasi from "./modalkonfirmasi";
import { Close, IcLock, Setting } from "../assets";

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

  const [hover, setHover] = useState(false);
  const [showOtherButton, setShowOtherButton] = useState(false);

  const handleSettingClick = () => {
    setShowOtherButton(!showOtherButton);
  };
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1> List App </h1>
      <div className="flex flex-col gap-2">
        <input
          className="outline-none w-full border-2 p-1 rounded-full px-4 border-gray-300  focus:border-[#178DF9]"
          placeholder="Cari App"
          onChange={(e) => filterApp(e.target.value)}
        />
      </div>
      {/* <a
        href="https://encryptionsupport.netlify.app/"
        target="_blank"
        className="bg-[#178DF9] absolute outline-none flex justify-center items-center w-full p-2 rounded-full text-[13px] text-white"
      >
        Go Encryption Tools
      </a> */}

      <div
        className={`fixed bottom-0 mb-4`}
        onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
      >
        {showOtherButton && (
          <a
            href="https://encryptionsupport.netlify.app/"
            target="_blank"
            onClick={handleSettingClick}
            className={`flex items-center outline-none p-3 mb-5 transition-all justify-center h-10 font-bold text-white bg-red-500 rounded-full shadow-lg mt-4`}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <img src={IcLock} className="w-5 h-5" />
              Encryption Tools
            </div>
          </a>
        )}
        <button
          className={`flex items-center p-3 transition-all justify-center h-10 font-bold text-white bg-blue-500 rounded-full shadow-lg w-${
            hover ? "28" : "10"
          } hover:bg-blue-700`}
          onClick={handleSettingClick}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <img src={showOtherButton ? Close : Setting} className="w-5 h-5" />
            {hover && <p>{"Go"}</p>}
          </div>
        </button>
      </div>
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
